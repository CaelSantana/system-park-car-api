const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  vehicles_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicles_type',
      key: 'id',
    },
  },
  icon: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE(6),
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE(6),
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: true, // Habilita timestamps automáticos
  createdAt: 'created_at', // Mapeia createdAt para created_at
  updatedAt: 'updated_at', // Mapeia updatedAt para updated_at
  tableName: 'brands', // Nome da tabela no banco de dados
});

module.exports = Brand;