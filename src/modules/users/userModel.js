const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const Role = require('../roles/roleModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  roles_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false, // Desativa timestamps automáticos do Sequelize
  underscored: true, // Usa snake_case para nomes de coluna
});

// Define a associação com o modelo de roles
User.associate = models => {
  User.belongsTo(models.Role, {
    foreignKey: 'roles_id',
    as: 'role',
  });
};

User.belongsTo(Role, { foreignKey: 'roles_id', as: 'role' });

module.exports = User;