const { Sequelize } = require('sequelize');
const CarParkCapacity = require('./carParkCapacityModel');
const CarPark = require('../carParks/carParkModel');
const VehicleType = require('../vehiclesType/vehicleTypeModel');

const createCapacity = async (capacityData) => {
  try {
    return await CarParkCapacity.create(capacityData);
  } catch (error) {
    throw new Error('Erro ao criar a capacidade: ' + error.message);
  }
};

const getAllCapacities = async () => {
  try {
    return await CarParkCapacity.findAll({
      include: [
        {
          model: CarPark,
          as: 'car_park',
          attributes: ['name']
        },
        {
          model: VehicleType,
          as: 'vehicle_type',
          attributes: ['type']
        },
        {
          model: VehicleType,
          as: 'vehicle_type',
          attributes: ['type_name'] // Inclui apenas o type_name da tabela vehicles_type
        }
      ]
    });
  } catch (error) {
    throw new Error('Erro ao buscar todas as capacidades: ' + error.message);
  }
};

const getCapacityById = async (id) => {
  try {
    return await CarParkCapacity.findByPk(id);
  } catch (error) {
    throw new Error('Erro ao buscar a capacidade: ' + error.message);
  }
};

const getCapacitiesByVehicleType = async (carParksId) => {
  try {
    return await CarParkCapacity.findAll({
      where: { car_parks_id: carParksId }, // Filtra por ID do estacionamento
      attributes: [
        [Sequelize.col('vehicle_type.type_name'), 'vehicle_type_name'], // Renomeia o campo type_name para vehicle_type_name
        [Sequelize.col('vehicles_type_id'), 'vehicles_type_id'], // Inclui vehicles_type_id
        [Sequelize.fn('SUM', Sequelize.col('capacity')), 'total_spaces'] // Soma todas as capacidades
      ],
      include: [
        {
          model: VehicleType,
          as: 'vehicle_type',
          attributes: [] // Nenhum atributo adicional, pois já estamos renomeando acima
        }
      ],
      group: ['vehicle_type.type_name', 'vehicles_type_id'], // Agrupa pelo nome do tipo de veículo
    });
  } catch (error) {
    throw new Error('Erro ao buscar capacidades por tipo de veículo: ' + error.message);
  }
};

const updateCapacity = async (id, capacityData) => {
  try {
    const capacity = await CarParkCapacity.findByPk(id);
    if (!capacity) {
      throw new Error('Capacidade não encontrada');
    }
    return await capacity.update(capacityData);
  } catch (error) {
    throw new Error('Erro ao atualizar a capacidade: ' + error.message);
  }
};

const deleteCapacityByVehicleType = async (vehiclesTypeId) => {
  try {
    const capacity = await CarParkCapacity.findOne({ where: { vehicles_type_id: vehiclesTypeId } });
    if (!capacity) {
      throw new Error('Capacidade não encontrada');
    }
    await capacity.destroy();
    return { message: 'Capacidade deletada com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar a capacidade: ' + error.message);
  }
};

module.exports = {
  createCapacity,
  getAllCapacities,
  getCapacityById,
  getCapacitiesByVehicleType,
  updateCapacity,
  deleteCapacityByVehicleType
};
