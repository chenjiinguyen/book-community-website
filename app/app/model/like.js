const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const User = require('./user');

const Like = sequelize.define('Like', {
  // Model attributes are defined here
  username : {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
        model: User,
        key: "username"
    }
 
  },idbook: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
        model: Book,
        key: "idbook"
    }
  }
}, {
    sequelize,
    modelName: 'LIKE',
});
Like.associate = (models) => {
    Like.belongsTo(models.Book, {
        as: 'Book',
        foreignKey: "idbook"
    });
    Like.belongsTo(models.User, {
        as: 'User',
        foreignKey: "username"
    });
};
module.exports = Like;