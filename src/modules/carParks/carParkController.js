const carParkService = require('./carParkService');

exports.createCarPark = async (req, res) => {
  try {
    const carPark = await carParkService.createCarPark(req.body);
    res.status(201).json(carPark);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o estacionamento: ' + error.message });
  }
};

exports.getAllCarParks = async (_req, res) => {
  try {
    const carParks = await carParkService.getAllCarParks();
    res.status(200).json(carParks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os estacionamentos: ' + error.message });
  }
};

exports.getCarParkById = async (req, res) => {
  try {
    const carPark = await carParkService.getCarParkById(req.params.id);
    if (!carPark) {
      return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }
    res.status(200).json(carPark);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o estacionamento: ' + error.message });
  }
};

exports.updateCarPark = async (req, res) => {
  try {
    const carPark = await carParkService.updateCarPark(req.params.id, req.body);
    if (!carPark) {
      return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }
    res.status(200).json(carPark);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o estacionamento: ' + error.message });
  }
};

exports.deleteCarPark = async (req, res) => {
  try {
    const result = await carParkService.deleteCarPark(req.params.id);
    if (result.message === 'Estacionamento não encontrado') {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Estacionamento não encontrado') {
      res.status(404).json({ error: 'Estacionamento não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar o estacionamento: ' + error.message });
    }
  }
};
