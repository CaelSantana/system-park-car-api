const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Tariff = sequelize.define('Tariff', {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
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
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'tariffs',
});

module.exports = Tariff;
