const CarPark = require('./carParkModel');

const createCarPark = async (carParkData) => {
  try {
    return await CarPark.create(carParkData);
  } catch (error) {
    throw new Error('Erro ao criar o estacionamento: ' + error.message);
  }
};

const getAllCarParks = async () => {
  try {
    return await CarPark.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar todos os estacionamentos: ' + error.message);
  }
};

const getCarParkById = async (id) => {
  try {
    return await CarPark.findByPk(id);
  } catch (error) {
    throw new Error('Erro ao buscar o estacionamento: ' + error.message);
  }
};

const updateCarPark = async (id, carParkData) => {
  try {
    const carPark = await CarPark.findByPk(id);
    if (!carPark) {
      throw new Error('Estacionamento não encontrado');
    }
    return await carPark.update(carParkData);
  } catch (error) {
    throw new Error('Erro ao atualizar o estacionamento: ' + error.message);
  }
};

const deleteCarPark = async (id) => {
  try {
    const carPark = await CarPark.findByPk(id);
    if (!carPark) {
      throw new Error('Estacionamento não encontrado');
    }
    await carPark.destroy();
    return { message: 'Estacionamento deletado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar o estacionamento: ' + error.message);
  }
};

module.exports = {
  createCarPark,
  getAllCarParks,
  getCarParkById,
  updateCarPark,
  deleteCarPark
};