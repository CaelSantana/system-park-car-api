const carParkCapacityService = require('./carParkCapacityService');

exports.createCapacity = async (req, res) => {
  try {
    const capacity = await carParkCapacityService.createCapacity(req.body);
    res.status(201).json(capacity);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a capacidade: ' + error.message });
  }
};

exports.getAllCapacities = async (_req, res) => {
  try {
    const capacities = await carParkCapacityService.getAllCapacities();
    res.status(200).json(capacities);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as capacidades: ' + error.message });
  }
};

exports.getCapacityById = async (req, res) => {
  try {
    const capacity = await carParkCapacityService.getCapacityById(req.params.id);
    if (!capacity) {
      return res.status(404).json({ error: 'Capacidade não encontrada' });
    }
    res.status(200).json(capacity);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a capacidade: ' + error.message });
  }
};

exports.getCapacitiesByVehicleType = async (req, res) => {
  try {
    const carParksId = req.params.car_parks_id; // Obtém o ID do estacionamento dos parâmetros
    const capacities = await carParkCapacityService.getCapacitiesByVehicleType(carParksId);

    if (capacities.length === 0) {
      return res.status(404).json({ error: 'Nenhuma capacidade encontrada para este estacionamento' });
    }

    res.status(200).json(capacities);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as capacidades: ' + error.message });
  }
};

exports.updateCapacity = async (req, res) => {
  try {
    const capacity = await carParkCapacityService.updateCapacity(req.params.id, req.body);
    if (!capacity) {
      return res.status(404).json({ error: 'Capacidade não encontrada' });
    }
    res.status(200).json(capacity);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a capacidade: ' + error.message });
  }
};

exports.deleteCapacityByVehicleType = async (req, res) => {
  try {
    const vehiclesTypeId = req.params.vehicles_type_id;
    const result = await carParkCapacityService.deleteCapacityByVehicleType(vehiclesTypeId);
    if (result.message === 'Capacidade não encontrada') {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Capacidade não encontrada') {
      res.status(404).json({ error: 'Capacidade não encontrada' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar a capacidade: ' + error.message });
    }
  }
};
