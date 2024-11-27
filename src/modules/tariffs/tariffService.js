const Tariff = require('./tariffModel');

const createTariff = async (tariffData) => {
  try {
    return await Tariff.create(tariffData);
  } catch (error) {
    throw new Error('Erro ao criar a tarifa: ' + error.message);
  }
};

const getAllTariffs = async () => {
  try {
    return await Tariff.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar todas as tarifas: ' + error.message);
  }
};

const getTariffById = async (id) => {
  try {
    return await Tariff.findByPk(id);
  } catch (error) {
    throw new Error('Erro ao buscar a tarifa: ' + error.message);
  }
};

const updateTariff = async (id, tariffData) => {
  try {
    const tariff = await Tariff.findByPk(id);
    if (!tariff) {
      throw new Error('Tarifa não encontrada');
    }
    return await tariff.update(tariffData);
  } catch (error) {
    throw new Error('Erro ao atualizar a tarifa: ' + error.message);
  }
};

const deleteTariff = async (id) => {
  try {
    const tariff = await Tariff.findByPk(id);
    if (!tariff) {
      throw new Error('Tarifa não encontrada');
    }
    await tariff.destroy();
    return { message: 'Tarifa excluída com sucesso' };
  } catch (error) {
    throw new Error('Erro ao exluir a tarifa: ' + error.message);
  }
};

module.exports = {
  createTariff,
  getAllTariffs,
  getTariffById,
  updateTariff,
  deleteTariff
};