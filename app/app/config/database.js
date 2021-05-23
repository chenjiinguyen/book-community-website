const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'BOOKCOMMUNITY', 
  process.env.MYSQL_USERNAME || 'root', 
  process.env.MYSQL_PASSWORD || 'root', {
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  // pool: {
  //   max: process.env.MYSQL_POOL_MAX || 5,
  //   min: process.env.MYSQL_POOL_MIN || 1,
  //   acquire: process.env.MYSQL_POOL_ACQUIRE || 30000,
  //   idle: process.env.MYSQL_POOL_IDLE || 10000
  // }
});
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
module.exports = sequelize;