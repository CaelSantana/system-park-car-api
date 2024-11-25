const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { authenticateUser, googleAuthenticateUser } = require('./authService');
const User = require('../modules/users/userModel');
const authService = require('./authService');
const sendEmail = require('../auth/utils/sendEmail');

const createUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user)
    // Cria o usuário no serviço de usuário, passando os dados necessários
    const newUser = await authService.createUser(user);

    // Retorna o usuário criado
    res.status(201).json(newUser);
  } catch (error) {
    // Se ocorrer algum erro, retorna um erro 500 com a mensagem de erro
    res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authenticateUser(email, password);
    res.status(200).json({
      message: 'Autenticado com sucesso',
      token: token,
      user: user
    });
  } catch (error) {
    res.status(401).json({ message: 'Falha na autenticação', error: error.message });
  }
};

const googleLogin = async (req, res) => {
  const { googleToken } = req.body;

  try {
    const { user, jwtToken } = await googleAuthenticateUser(googleToken);
    res.status(200).json({
      message: 'Autenticado com sucesso com Google',
      token: jwtToken,
      user: user
    });
  } catch (error) {
    res.status(401).json({ message: 'Falha na autenticação com Google', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    // user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send('Password reset successful');
  } catch (error) {
    res.status(500).send('Error resetting password');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    console.log('Password reset email sent');
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  login,
  googleLogin,
  resetPassword,
  forgotPassword
};