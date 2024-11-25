const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const CarPark = sequelize.define('CarPark', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(255),
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
  tableName: 'car_parks', // Nome da tabela no banco de dados
});

module.exports = CarPark;
