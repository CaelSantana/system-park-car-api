const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const Ticket = require('../tickets/ticketModel');
const User = require('../users/userModel');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tickets_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tickets',
      key: 'id',
    },
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela referenciada
      key: 'id' // Chave referenciada
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM('cash', 'debit_card', 'credit_card', 'pix', 'others'),
    allowNull: false
  },
  // method_name: {
  //   type: DataTypes.ENUM('Dinheiro', 'Cartão de débito', 'Cartão de crédito', 'PIX', 'Outros'),
  //   allowNull: false
  // },
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
  tableName: 'payments',
});

Payment.belongsTo(Ticket, { foreignKey: 'tickets_id' });
Payment.belongsTo(User, { foreignKey: 'client_id', as: 'user' });

module.exports = Payment;
