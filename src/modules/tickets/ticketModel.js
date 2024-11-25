const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const User = require('./../users/userModel');
const VehiclesType = require('./../vehiclesType/vehicleTypeModel');
const Brand = require('../brands/brandModel');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  car_parks_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'car_parks', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  garage_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicles_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicles_type',
      key: 'id',
    },
  },
  brands_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brands', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  vehicles_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vehicles', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  vehicles_plate: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: 'vehicles', // Nome da tabela referenciada
      key: 'id'
    }
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finish_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tariffs_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tariffs', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'users', // Nome da tabela referenciada
    //   key: 'id' // Chave referenciada
    // }
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'canceled'),
    allowNull: false,
    defaultValue: 'pending',
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
  }
}, {
  timestamps: true, // Habilita timestamps automáticos
  createdAt: 'created_at', // Mapeia createdAt para created_at
  updatedAt: 'updated_at', // Mapeia updatedAt para updated_at
  tableName: 'tickets', // Nome da tabela no banco de dados
});

Ticket.belongsTo(User, { as: 'client', foreignKey: 'client_id' });
Ticket.belongsTo(User, { as: 'employee', foreignKey: 'employee_id' });
Ticket.belongsTo(VehiclesType, { as: 'vehicleType', foreignKey: 'vehicles_type_id' });
Ticket.belongsTo(Brand, { as: 'brand', foreignKey: 'brands_id' });

module.exports = Ticket;
