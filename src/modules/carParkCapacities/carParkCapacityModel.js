const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const CarPark = require('../carParks/carParkModel');
const VehicleType = require('../vehiclesType/vehicleTypeModel');

const CarParkCapacities = sequelize.define('CarParkCapacities', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  car_parks_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicles_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
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
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'car_park_capacities',
});

CarParkCapacities.belongsTo(CarPark, { foreignKey: 'car_parks_id', as: 'car_park' });
CarParkCapacities.belongsTo(VehicleType, { foreignKey: 'vehicles_type_id', as: 'vehicle_type' });

module.exports = CarParkCapacities;
