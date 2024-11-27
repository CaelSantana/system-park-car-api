const User = require('../modules/users/userModel');
const Role = require('../modules/roles/roleModel');

const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId, {
        include: {
          model: Role,
          as: 'role',
        },
      });
      if (!user) {
        return res.status(403).json({ message: 'Usuário não encontrado' });
      }
      const userRole = user.role.name;
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao verificar papel do usuário' });
    }
  };
};

module.exports = authorize;
