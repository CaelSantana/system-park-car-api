const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('./../modules/users/userModel');
const Role = require('./../modules/roles/roleModel')

// const createUser = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log('criouuuuu')
//   return User.create({ email, password: hashedPassword });
// };

// const createUser = async (userData) => {
//   try {
//     if (userData.birth) {
//       const [day, month, year] = userData.birth.split('/');
//       const formattedDate = `${year}/${month}/${day}`;
    
//       userData.birth = new Date(formattedDate).toISOString();
//     }
//     console.log('criouuuuu nooooo authhhh')
//     return await User.create(userData);
//   } catch (error) {
//     throw new Error('Erro ao criar usuário: ' + error.message);
//   }
// };

const createUser = async (userData) => {
  try {

    if (userData.birth) {
      const [day, month, year] = userData.birth.split('/');
      const formattedDate = `${year}/${month}/${day}`;
    
      userData.birth = new Date(formattedDate).toISOString();
    }

    // Criptografa a senha
    userData.password = await bcrypt.hash(userData.password, 10);

    // Cria o usuário no banco
    const user = await User.create(userData);

    return user;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

const authenticateUser = async (email, password) => {
  console.log('Email recebido:', email);
  console.log('Senha recebida:', password);
  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['name'] // Inclua os atributos necessários da role
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Senha fornecida:', password);
    console.log('Senha armazenada:', user.password);
    console.log('Senha válida:', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name // Inclua a role no token se necessário
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role.name // Inclua a role nos dados do usuário
      },
      token
    };
  } catch (error) {
    console.log('errrrooo', error)
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
        roles_id: 1 // Defina o papel padrão se necessário
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
        role: user.role.name // Agora inclui o nome da role
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    console.log("Usuário autenticado com Googleeeeeeeeeeeee:", user);
    console.log("Token JWT geradooooooooo:", jwtToken);

    return {
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role.name // Inclua o nome da role no retorno
      },
      jwtToken
    };
  } catch (error) {
    throw new Error('Falha na autenticação com Google: ' + error.message);
  }
};


module.exports = { createUser, authenticateUser, googleAuthenticateUser };




// Caso queira voltar a exibir as outras informações e não passar a role no localstorage


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('./userModel');

// const createUser = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return User.create({ email, password: hashedPassword });
// };

// const findUserByEmail = (email) => {
//   return User.findOne({ where: { email } });
// };

// const authenticateUser = async (email, password) => {
//   const user = await findUserByEmail(email);
//   if (!user) {
//     throw new Error('User not found');
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     throw new Error('Invalid password');
//   }

//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     process.env.JWT_KEY,
//     { expiresIn: '1h' }
//   );

//   return { user, token };
// };

// module.exports = { createUser, authenticateUser };