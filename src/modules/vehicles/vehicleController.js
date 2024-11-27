const vehicleService = require('./vehicleService');

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário: ' + error.message });
  }
};

exports.getAllVehicles = async (_req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehicleByPlate = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleByPlate(req.params.plate);
    res.status(200).json(vehicle);
  } catch (error) {
    if (error.message === 'Veículo não encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getVehiclesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const vehicle = await vehicleService.getVehiclesByUserId(userId);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    if (error.message === 'Veículo não encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.deleteVehicle(req.params.plate);
    res.status(200).json({ message: 'Veículo excluído com sucesso' });
  } catch (error) {
    if (error.message === 'Veículo não encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};