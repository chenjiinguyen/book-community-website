var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
// const sequelize = require('../config/database');
require("dotenv").config();
var models = {};

let reconnectOptions = {
  max_retries: 999,
  onRetry: function (count) {
    console.log("connection lost, trying to reconnect (" + count + ")");
  },
};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "BOOKCOMMUNITY",
  process.env.MYSQL_USERNAME || "root",
  process.env.MYSQL_PASSWORD || "root",
  {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: false,
    reconnect: reconnectOptions || true,
  }
);

// var models_name = [
//     'book',
//     'category',
//     'comment',
//     'episode',
//     'moderation_book',
//     'moderation_episode',
//     'like',
//     'point',
//     'role',
//     'user',
//     'usergroup',
//     'usergroup_role',
// ];

// models_name.forEach(function(model) {
//     models[model] = require("./"+model);
// });
fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== basename;
  })
  .forEach(function (file) {
    if (file.slice(-3) !== ".js") return;
    var model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

(async () => {
  sequelize
    .sync()
    .then(function () {
      console.log("Nice! Database looks fine");
    })
    .catch(function (err) {
      console.log(err, "Something went wrong with the Database Update!");
    });
})();

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
