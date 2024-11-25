const vehiclesTypeService = require('./vehicleTypeService');

exports.createVehiclesType = async (req, res) => {
  try {
    const { type, description } = req.body;

    const newVehiclesType = await vehiclesTypeService.createVehiclesType({ type, description });

    res.status(201).json(newVehiclesType);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tipo de veículo: ' + error.message });
  }
};

exports.getAllVehiclesTypes = async (_req, res) => {
  try {
    const vehiclesTypes = await vehiclesTypeService.getAllVehiclesTypes();
    res.status(200).json(vehiclesTypes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipos de veículos: ' + error.message });
  }
};

exports.getVehiclesTypeById = async (req, res) => {
  try {
    const vehiclesType = await vehiclesTypeService.getVehiclesTypeById(req.params.id);
    if (!vehiclesType) {
      res.status(404).json({ error: 'Tipo de veículo não encontrado' });
    } else {
      res.status(200).json(vehiclesType);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipo de veículo: ' + error.message });
  }
};

exports.updateVehiclesType = async (req, res) => {
  try {
    const vehiclesType = await vehiclesTypeService.updateVehiclesType(req.params.id, req.body);
    res.status(200).json(vehiclesType);
  } catch (error) {
    if (error.message === 'Tipo de veículo não encontrado') {
      res.status(404).json({ error: 'Tipo de veículo não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar tipo de veículo: ' + error.message });
    }
  }
};

exports.deleteVehiclesType = async (req, res) => {
  try {
    const result = await vehiclesTypeService.deleteVehiclesType(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Tipo de veículo não encontrado') {
      res.status(404).json({ error: 'Tipo de veículo não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar tipo de veículo: ' + error.message });
    }
  }
};
