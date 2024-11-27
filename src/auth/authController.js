const crypto = require('crypto');
const { authenticateUser, googleAuthenticateUser } = require('./authService');
const User = require('../modules/users/userModel');
const authService = require('./authService');

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await authService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
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
      return res.status(400).send('Token invalido ou expirado');
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send('Password resetado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao resetar password');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
    const message = `Você está recebendo este e-mail porque você (ou outra pessoa) solicitou a redefinição de uma senha.: \n\n ${resetUrl}`;
    await sendEmail({
      email: user.email,
      subject: 'Resete de password e token',
      message
    });
    res.status(200).json({ message: 'Email encaminhado' });
  } catch (error) {
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