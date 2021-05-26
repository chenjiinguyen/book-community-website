const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Episode = require('./episode');
const User = require('./user');

const Point = sequelize.define('Point', {
  // Model attributes are defined here
  username : {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
        model: User,
        key: "username"
    }
 
  },idepisode: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
        model: Episode,
        key: "idepisode"
    }
  },charge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  point: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }
}, {
    sequelize,
    modelName: 'POINT',
    tableName: 'POINTS',
});
Point.associate = (models) => {
    Point.belongsTo(models.Book, {
        as: 'Episode',
        foreignKey: "idepisode"
    });
    Point.belongsTo(models.User, {
        as: 'User',
        foreignKey: "iduser"
    });
};
module.exports = Point;