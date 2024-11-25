const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const User =require('../users/userModel');
const Brand = require('../brands/brandModel');
const VehiclesType = require('../vehiclesType/vehicleTypeModel');

class Vehicle extends Model {}

Vehicle.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  plate: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  vehicles_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicles_type', // Nome da tabela referenciada
      key: 'id',
    },
  },
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela referenciada
      key: 'id',
    },
  },
  brands_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brands', // Nome da tabela referenciada
      key: 'id',
    },
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
  },
}, {
  sequelize,
  modelName: 'Vehicle',
  tableName: 'vehicles',
  timestamps: true, // Habilitar timestamps para utilizar createdAt e updatedAt
  createdAt: 'created_at', // Mapeamento do nome da coluna
  updatedAt: 'updated_at', // Mapeamento do nome da coluna
});

Vehicle.belongsTo(User, { foreignKey: 'users_id', as: 'user' });
Vehicle.belongsTo(Brand, { foreignKey: 'brands_id', as: 'brand' });
Vehicle.belongsTo(VehiclesType, { foreignKey: 'vehicles_type_id', as: 'type' });

module.exports = Vehicle;
