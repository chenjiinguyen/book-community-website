const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();

let reconnectOptions = {
  max_retries: 999,
  onRetry: function(count) {
    console.log("connection lost, trying to reconnect ("+count+")");
  }
};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'BOOKCOMMUNITY', 
  process.env.MYSQL_USERNAME || 'root', 
  process.env.MYSQL_PASSWORD || 'root', {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  dialect: 'mysql',
  operatorsAliases: 0,
  logging: false,
  reconnect: reconnectOptions || true
});
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
module.exports = sequelize;