const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const Address = require('../address/addressModel')
const Vehicle = require('../vehicles/vehicleModel')
const Role = require('../roles/roleModel')

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
        attributes: ['name', 'description'],
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
    return { exists: !!user };
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

const updateUserPassword = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
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
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (existingAddress) {
      throw new Error('Endereço para o usuário já existe');
    }
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
      throw new Error('O ID do usuário é obrigatório');
    }
    const address = await Address.findOne({ where: { users_id: userId } });
    return address;
  } catch (error) {
    throw new Error('Erro ao obter endereço: ' + error.message);
  }
};

const updateAddressForUser = async (userId, addressData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (!existingAddress) {
      throw new Error('Endereço do usuário não encontrado');
    }
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
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const existingAddress = await Address.findOne({ where: { users_id: userId } });
    if (!existingAddress) {
      throw new Error('Endereço do usuário não encontrado');
    }
    await existingAddress.destroy();
    return { message: 'Enderereço excluído com sucesso' };
  } catch (error) {
    throw new Error('Erro ao excluir o endereço do usuário: ' + error.message);
  }
};

const getVehicleByPlate = async (plate) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { plate } });
    return { exists: !!vehicle };
  } catch (error) {
    throw new Error('Erro ao buscar veículo por placa: ' + error.message);
  }
};

const createVehicleForUser = async (userId, vehicleData) => {
  try {
    const existingVehicleByPlate = await getVehicleByPlate(vehicleData.plate);
    if (existingVehicleByPlate.exists) {
      throw new Error('Veículo com placa já cadastrada');
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (existingVehicle) {
      throw new Error('Veículo para o usuário já existe');
    }
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
      throw new Error('O ID do usuário é obrigatório');
    }
    const vehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!vehicle) {
      throw new Error('Veículo do usuário não encontrado');
    }
    return vehicle;
  } catch (error) {
    throw new Error('Erro ao obter o veículo: ' + error.message);
  }
};

const updateVehicleForUser = async (userId, vehicleData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!existingVehicle) {
      throw new Error('Veículo do usuário não encontrado');
    }
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
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const existingVehicle = await Vehicle.findOne({ where: { users_id: userId } });
    if (!existingVehicle) {
      throw new Error('Veículo do usuário não encontrado');
    }
    await existingVehicle.destroy();

    return { message: 'Vehicle excluído com sucesso' };
  } catch (error) {
    throw new Error('Erro ao excluir o veículo do usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByCPF,
  getUserById,
  updateUser,
  updateUserPassword,
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
