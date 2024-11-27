const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql'
  }
);

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;


