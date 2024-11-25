const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const Address = require('../address/addressModel')
const Vehicle = require('../vehicles/vehicleModel')
const Role = require('../roles/roleModel')
// const { Op } = require('sequelize'); O Op do Sequelize é um conjunto de operadores que você pode usar para construir consultas complexas no Sequelize. Ele facilita a criação de condições de consulta (where clauses) que vão além das comparações simples de igualdade. Aqui estão alguns exemplos de como e por que você pode usar Op:

// const createUser = async (userData) => {
//   try {
//     if (userData.birth) {
//       const [day, month, year] = userData.birth.split('/');
//       const formattedDate = `${year}/${month}/${day}`;
    
//       userData.birth = new Date(formattedDate).toISOString();
//     }
//     console.log('criouuuuu nooooo user')
//     return await User.create(userData);
//   } catch (error) {
//     throw new Error('Erro ao criar usuário: ' + error.message);
//   }
// };

const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar todos os usuários: ' + error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        as: 'role',
        attributes: ['name', 'description'], // Inclui apenas as colunas name e description
      },
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar usuário por ID: ' + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return { exists: !!user }; // Retorna um objeto com a propriedade exists
  } catch (error) {
    throw new Error('Erro ao buscar usuário por email: ' + error.message);
  }
};

const getUserByCPF = async (cpf) => {
  try {
    const user = await User.findOne({ where: { cpf } });
    return { exists: !!user };
  } catch (error) {
    throw new Error('Erro ao buscar usuário por CPF: ' + error.message);
  }
};

// const authenticateUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Busca o usuário pelo email usando Sequelize
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ message: 'Falha na autenticação' });
//     }

//     // Verifica se a senha está correta
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Falha na autenticação' });
//     }

//     // Gera um token JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email
//       },
//       process.env.JWT_KEY, // Substitua pelo seu segredo JWT
//       { expiresIn: '1h' } // Tempo de expiração do token
//     );

//     return res.status(200).json({
//       message: 'Autenticado com sucesso',
//       token: token
//     });

//   } catch (error) {
//     return res.status(500).json({ message: 'Erro na autenticação', error: error.message });
//   }
// };

const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (userData.birth) {
      const [day, month, year] = userData.birth.split('/');
      const formattedDate = `${year}/${month}/${day}`;
    
      userData.birth = new Date(formattedDate).toISOString();
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
    
    return await user.update(userData);
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    await user.destroy();
    return { message: 'Usuário deletado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

const createAddressForUser = async (userId, addressData) => {
  try {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se o usuário já possui um endereço
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (existingAddress) {
      throw new Error('Address for user already exists');
    }

    // Cria o endereço associado ao usuário
    const address = await Address.create({
      users_id: userId,
      zip_code: addressData.zip_code,
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
      district: addressData.district,
      city: addressData.city,
      state: addressData.state,
    });
    
    return address;

  } catch (error) {
    throw new Error('Erro ao criar o endereço do usuário: ' + error.message);
  }
};

const getAddressByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const address = await Address.findOne({ where: { users_id: userId } });
    return address;
  } catch (error) {
    throw new Error('Error fetching address: ' + error.message);
  }
};

const updateAddressForUser = async (userId, addressData) => {
  try {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Verifica se o endereço do usuário existe
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (!existingAddress) {
      throw new Error('Address for user not found');
    }
    // Atualiza o endereço associado ao usuário
    await existingAddress.update({
      zip_code: addressData.zip_code,
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
      district: addressData.district,
      city: addressData.city,
      state: addressData.state,
    });

    return existingAddress;

  } catch (error) {
    throw new Error('Erro ao atualizar o endereço do usuário: ' + error.message);
  }
};

const deleteAddressForUser = async (userId) => {
  try {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se o endereço do usuário existe
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (!existingAddress) {
      throw new Error('Address for user not found');
    }

    // Exclui o endereço associado ao usuário
    await existingAddress.destroy();

    return { message: 'Address deleted successfully' };
  } catch (error) {
    throw new Error('Erro ao excluir o endereço do usuário: ' + error.message);
  }
};

const getVehicleByPlate = async (plate) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { plate } });
    return { exists: !!vehicle }; // Retorna true se a placa já estiver cadastrada
  } catch (error) {
    throw new Error('Erro ao buscar veículo por placa: ' + error.message);
  }
};

const createVehicleForUser = async (userId, vehicleData) => {
  try {
    const existingVehicleByPlate = await getVehicleByPlate(vehicleData.plate);
    if (existingVehicleByPlate.exists) {
      throw new Error('Vehicle with this plate already exists');
    }
    
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se o usuário já possui um veículo
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (existingVehicle) {
      throw new Error('Vehicle for user already exists');
    }

    // Cria o veículo associado ao usuário
    const vehicle = await Vehicle.create({
      users_id: userId,
      plate: vehicleData.plate,
      vehicles_type_id: vehicleData.vehicles_type_id,
      brands_id: vehicleData.brands_id,
    });

    return vehicle;

  } catch (error) {
    throw new Error('Erro ao criar o veículo do usuário: ' + error.message);
  }
};

const getVehicleByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const vehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!vehicle) {
      throw new Error('Vehicle not found for user');
    }
    return vehicle;
  } catch (error) {
    throw new Error('Error fetching vehicle: ' + error.message);
  }
};

const updateVehicleForUser = async (userId, vehicleData) => {
  try {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Verifica se o veículo do usuário existe
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!existingVehicle) {
      throw new Error('Vehicle for user not found');
    }
    // Atualiza o veículo associado ao usuário
    await existingVehicle.update({
      plate: vehicleData.plate,
      vehicles_type_id: vehicleData.vehicles_type_id,
      brands_id: vehicleData.brands_id,
    });

    return existingVehicle;
  } catch (error) {
    throw new Error('Erro ao atualizar o veículo do usuário: ' + error.message);
  }
};

const deleteVehicleForUser = async (userId) => {
  try {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se o veículo do usuário existe
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!existingVehicle) {
      throw new Error('Vehicle for user not found');
    }

    // Exclui o veículo associado ao usuário
    await existingVehicle.destroy();

    return { message: 'Vehicle deleted successfully' };
  } catch (error) {
    throw new Error('Erro ao excluir o veículo do usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  // createUser,
  getUserByEmail,
  // getUserByName,
  getUserByCPF,
  getUserById,
  // authenticateUser,
  updateUser,
  deleteUser,
  
  createAddressForUser,
  getAddressByUserId,
  updateAddressForUser,
  deleteAddressForUser,

  getVehicleByPlate,
  createVehicleForUser,
  updateVehicleForUser,
  getVehicleByUserId,
  deleteVehicleForUser
};
