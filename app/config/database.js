const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE || 'BOOKCOMMUNITY', 
  process.env.USERNAME || 'root', 
  process.env.PASSWORD || 'root', {
  host: process.env.HOST || 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  pool: {
    max: process.env.POOL_MAX || 5,
    min: process.env.POOL_MIN || 0,
    acquire: process.env.POOL_ACQUIRE || 30000,
    idle: process.env.POOL_IDLE || 10000
  }
});
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
module.exports = sequelize;