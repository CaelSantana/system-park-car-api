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
      model: 'vehicles_type', // Nome da tabela referenciada
      key: 'id', // Chave referenciada
    },
  },
  // duration: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // start_time: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // end_time: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
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
  timestamps: true, // Habilita timestamps automáticos
  createdAt: 'created_at', // Mapeia createdAt para created_at
  updatedAt: 'updated_at', // Mapeia updatedAt para updated_at
  tableName: 'tariffs', // Nome da tabela no banco de dados
});

module.exports = Tariff;
