const User = require('../modules/users/userModel');
const Role = require('../modules/roles/roleModel');

const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      console.log('Required roles:', requiredRoles);

        // Adicionando logs para verificar se User está definido
        console.log('User model:', User);
      
      const user = await User.findByPk(req.userId, {
        include: {
          model: Role,
          as: 'role',
        },
      });

      if (!user) {
        console.log('Usuário não encontrado');
        return res.status(403).json({ message: 'Usuário não encontrado' });
      }

      const userRole = user.role.name;
      console.log('Role do usuário:', userRole);

      if (!requiredRoles.includes(userRole)) {
        console.log('Acesso negado para role:', userRole);
        return res.status(403).json({ message: 'Acesso negado' });
      }

      next();
    } catch (error) {
      console.log('Erro ao verificar papel do usuário:', error.message);
      return res.status(500).json({ message: 'Erro ao verificar papel do usuário' });
    }
  };
};

module.exports = authorize;
