const userService = require('./userService');
const bcrypt = require('bcrypt');

// exports.createUser = async (req, res) => {
//   try {
//     // Recebe os dados do usuário do corpo da requisição (req.body)
//     const { roles_id, full_name, email, cpf, password, birth, phone } = req.body;

//     // Verifica se já existe um usuário com o mesmo email
//     // const existingUserByEmail = await userService.getUserByEmail(email);
//     // if (existingUserByEmail) {
//     //   return res.status(400).json({ error: 'Email já está em uso' });
//     // } 

//     // Verifica se já existe um usuário com o mesmo nome
//     // const existingUserByName = await userService.getUserByName(full_name);
//     // if (existingUserByName) {
//     //   return res.status(400).json({ error: 'Nome de usuário já está em uso' });
//     // }

//     // Verifica se já existe um usuário com o mesmo CPF
//     // const existingUserByCPF = await userService.getUserByCPF(cpf);
//     // if (existingUserByCPF) {
//     //   return res.status(400).json({ error: 'CPF já está cadastrado' });
//     // }

//     // Gera um hash bcrypt da senha
//     const hashedPassword = await bcrypt.hash(password, 10); // O segundo argumento é o custo do hash

//     // Cria o usuário no serviço de usuário, passando os dados necessários
//     const newUser = await userService.createUser({
//       roles_id,
//       full_name,
//       email,
//       password: hashedPassword,
//       cpf,
//       birth,
//       phone
//     });

//     // Retorna o usuário criado
//     res.status(201).json(newUser);
//   } catch (error) {
//     // Se ocorrer algum erro, retorna um erro 500 com a mensagem de erro
//     res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
//   }
// };

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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Address for user already exists')) {
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
      return res.status(404).json({ message: 'Address not found for user' });
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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Address for user not found')) {
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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Address for user not found')) {
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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Vehicle for user already exists') || error.message.includes('Vehicle with this plate already exists')) {
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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Vehicle for user not found')) {
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
    if (error.message.includes('User not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Vehicle for user not found')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};