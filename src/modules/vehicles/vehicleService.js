const Vehicle = require('./vehicleModel');
const User = require('../users/userModel');
const Brand = require('../brands/brandModel');
const VehiclesType = require('../vehiclesType/vehicleTypeModel');

const createVehicle = async (vehicleData) => {
  try {
    const vehicle = await Vehicle.create(vehicleData);
    return vehicle;
  } catch (error) {
    throw new Error('Error creating vehicle: ' + error.message);
  }
};

const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.findAll();
    return vehicles;
  } catch (error) {
    throw new Error('Error fetching vehicles: ' + error.message);
  }
};

const getVehicleByPlate = async (plate) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { plate },
      include: [
        {
          model: User,
          as: 'user', // Certifique-se de que o alias corresponde ao definido na associação
          attributes: ['full_name'] // Inclua apenas o nome do usuário
        }
      ]
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  } catch (error) {
    throw new Error('Error fetching vehicle: ' + error.message);
  }
};

const getVehiclesByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const vehicles = await Vehicle.findAll({ 
      where: { users_id: userId },
      include: [
        {
          model: Brand, // Inclua o modelo Brand
          as: 'brand', // O alias deve corresponder ao definido no modelo
          attributes: ['name'] // Inclua apenas o nome da marca
        },
        {
          model: VehiclesType, // Inclua o modelo Brand
          as: 'type', // O alias deve corresponder ao definido no modelo
          attributes: ['type_name'] // Inclua apenas o nome da marca
        }
      ]
     });
    return vehicles;
  } catch (error) {
    throw new Error('Error fetching vehicles: ' + error.message);
  }
};

const updateVehicle = async (id, vehicleData) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    await vehicle.update(vehicleData);
    return vehicle;
  } catch (error) {
    throw new Error('Error updating vehicle: ' + error.message);
  }
};

const deleteVehicle = async (id) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    await vehicle.destroy();
    return vehicle;
  } catch (error) {
    throw new Error('Error deleting vehicle: ' + error.message);
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
