const VehiclesType = require('./vehicleTypeModel');

const createVehiclesType = async (vehiclesTypeData) => {
  try {
    return await VehiclesType.create(vehiclesTypeData);
  } catch (error) {
    throw new Error('Erro ao criar tipo de veículo: ' + error.message);
  }
};

const getAllVehiclesTypes = async () => {
  try {
    return await VehiclesType.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar todos os tipos de veículos: ' + error.message);
  }
};

const getVehiclesTypeById = async (vehiclesTypeId) => {
  try {
    const vehiclesType = await VehiclesType.findByPk(vehiclesTypeId);
    if (!vehiclesType) {
      throw new Error('Tipo de veículo não encontrado');
    }
    return vehiclesType;
  } catch (error) {
    throw new Error('Erro ao buscar tipo de veículo por ID: ' + error.message);
  }
};

const updateVehiclesType = async (vehiclesTypeId, vehiclesTypeData) => {
  try {
    const vehiclesType = await VehiclesType.findByPk(vehiclesTypeId);
    if (!vehiclesType) {
      throw new Error('Tipo de veículo não encontrado');
    }
    return await vehiclesType.update(vehiclesTypeData);
  } catch (error) {
    throw new Error('Erro ao atualizar tipo de veículo: ' + error.message);
  }
};

const deleteVehiclesType = async (vehiclesTypeId) => {
  try {
    const vehiclesType = await VehiclesType.findByPk(vehiclesTypeId);
    if (!vehiclesType) {
      throw new Error('Tipo de veículo não encontrado');
    }
    await vehiclesType.destroy();
    return { message: 'Tipo de veículo deletado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar tipo de veículo: ' + error.message);
  }
};

module.exports = {
  createVehiclesType,
  getAllVehiclesTypes,
  getVehiclesTypeById,
  updateVehiclesType,
  deleteVehiclesType
};
