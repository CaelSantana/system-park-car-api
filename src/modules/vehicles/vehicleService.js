const Vehicle = require('./vehicleModel');
const User = require('../users/userModel');
const Brand = require('../brands/brandModel');
const VehiclesType = require('../vehiclesType/vehicleTypeModel');

const createVehicle = async (vehicleData) => {
  try {
    const vehicle = await Vehicle.create(vehicleData);
    return vehicle;
  } catch (error) {
    throw new Error('Erro ao criar o veículo: ' + error.message);
  }
};

const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.findAll();
    return vehicles;
  } catch (error) {
    throw new Error('Erro ao obter o veículo: ' + error.message);
  }
};

const getVehicleByPlate = async (plate) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { plate },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['full_name']
        }
      ]
    });

    if (!vehicle) {
      throw new Error('Veículo não encontrado');
    }

    return vehicle;
  } catch (error) {
    throw new Error('Erro ao obter o veículo: ' + error.message);
  }
};

const getVehiclesByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const vehicles = await Vehicle.findAll({ 
      where: { users_id: userId },
      include: [
        {
          model: Brand,
          as: 'brand',
          attributes: ['name']
        },
        {
          model: VehiclesType,
          as: 'type',
          attributes: ['type_name']
        }
      ]
     });
    return vehicles;
  } catch (error) {
    throw new Error('Erro ao obter o veículo: ' + error.message);
  }
};

const updateVehicle = async (id, vehicleData) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Veículo não encontrado');
    }
    await vehicle.update(vehicleData);
    return vehicle;
  } catch (error) {
    throw new Error('Erro ao atualizar o veículo: ' + error.message);
  }
};

const deleteVehicle = async (id) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Veículo não encontrado');
    }
    await vehicle.destroy();
    return vehicle;
  } catch (error) {
    throw new Error('Erro ao excluir o veículo: ' + error.message);
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleByPlate,
  getVehiclesByUserId,
  updateVehicle,
  deleteVehicle,
};
