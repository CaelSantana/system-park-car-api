const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('./../modules/users/userModel');
const Role = require('./../modules/roles/roleModel')

const createUser = async (userData) => {
  try {

    if (userData.birth) {
      const [day, month, year] = userData.birth.split('/');
      const formattedDate = `${year}/${month}/${day}`;
    
      userData.birth = new Date(formattedDate).toISOString();
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await User.create(userData);

    return user;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name
      },
      process.env.JWT_KEY,
      { expiresIn: '4h' }
    );
    return {
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role.name
      },
      token
    };
  } catch (error) {
    throw new Error('Falha na autenticação', error);
  }
};

const googleAuthenticateUser = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    let user = await User.findOne({ 
      where: { email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });
    if (!user) {
      const hashedPassword = await bcrypt.hash('G00Gl&@123', 10);
      user = await User.create({
        email: email,
        password: hashedPassword,
        full_name: name,
        roles_id: 1
      });
      user = await User.findOne({ 
        where: { id: user.id },
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      });
    }
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name
      },
      process.env.JWT_KEY,
      { expiresIn: '4h' }
    );
    return {
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role.name
      },
      jwtToken
    };
  } catch (error) {
    throw new Error('Falha na autenticação com Google: ' + error.message);
  }
};

module.exports = { createUser, authenticateUser, googleAuthenticateUser };