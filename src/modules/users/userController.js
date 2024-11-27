const userService = require('./userService');

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os usuários: ' + error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário por email: ' + error.message });
  }
};

exports.getUserByCPF = async (req, res) => {
  try {
    const { cpf } = req.params;
    const user = await userService.getUserByCPF(cpf);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário por CPF: ' + error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else if (error.message.includes('CPF já existe')) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
    }
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else{
      res.status(500).json({ error: 'Erro ao atualizar a senha: ' + error.message });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar usuário: ' + error.message });
    }
  }
};

exports.createAddressForUser = async (req, res) => {
  const { id } = req.params;
  const addressData = req.body;
  try {
    const address = await userService.createAddressForUser(id, addressData);
    res.status(201).json(address);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Endereço do usuário já existe')) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getAddressByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await userService.getAddressByUserId(id);
    if (!address) {
      return res.status(404).json({ message: 'Endereço do usuário não encontrado' });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAddressForUser = async (req, res) => {
  const { id } = req.params;
  const addressData = req.body;
  try {
    const address = await userService.updateAddressForUser(id, addressData);
    res.status(200).json(address);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Endereço do usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.deleteAddressForUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteAddressForUser(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Endereço do usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getVehicleByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await userService.getVehicleByUserId(id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVehicleForUser = async (req, res) => {
  const { id } = req.params;
  const vehicleData = req.body;
  try {
    const vehicle = await userService.createVehicleForUser(id, vehicleData);
    res.status(201).json(vehicle);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Veículo para o usuário já existe') || error.message.includes('Veículo com placa já cadastrada')) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.updateVehicleForUser = async (req, res) => {
  const { id } = req.params;
  const vehicleData = req.body;
  try {
    const vehicle = await userService.updateVehicleForUser(id, vehicleData);
    res.status(200).json(vehicle);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Veículo do usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.deleteVehicleForUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteVehicleForUser(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('Usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Veículo do usuário não encontrado')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};