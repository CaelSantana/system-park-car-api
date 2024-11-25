const tariffService = require('./tariffService');

exports.createTariff = async (req, res) => {
  try {
    const tariff = await tariffService.createTariff(req.body)
    res.status(201).json(tariff);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarifa: ' + error.message });
  }
};

exports.getAllTariffs = async (_req, res) => {
  try {
    const tariffs = await tariffService.getAllTariffs();
    res.status(200).json(tariffs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as tarifas: ' + error.message });
  }
};

exports.getTariffById = async (req, res) => {
  try {
    const tariff = await tariffService.getTariffById(req.params.id);
    if (!tariff) {
      return res.status(404).json({ error: 'Tarifa não encontrado' });
    } else {
      res.status(200).json(tariff);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a tarifa: ' + error.message });
  }
};

exports.updateTariff = async (req, res) => {
  try {
    const tariff = await tariffService.updateTariff(req.params.id, req.body);
    if (!tariff) {
      return res.status(404).json({ error: 'Tarifa não encontrada' });
    } else {
      res.status(200).json(tariff);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarifa: ' + error.message });
  }
};

exports.deleteTariff = async (req, res) => {
  try {
    const result = await tariffService.deleteTariff(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Tarifa não encontrado') {
      res.status(404).json({ error: 'Tarifa não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar a tarifa: ' + error.message });
    }
  }
};