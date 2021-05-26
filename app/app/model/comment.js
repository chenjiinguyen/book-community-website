const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const User = require('./user');

const Comment = sequelize.define('Comment', {
  // Model attributes are defined here
  idcomment : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  iduser : {
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
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    content : { 
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
}, {
    sequelize,
    modelName: 'COMMENT',
    tableName: 'COMMENTS'
});
Comment.associate = (models) => {
    Comment.belongsTo(models.Book, {
        as: 'Book',
        foreignKey: "idbook"
    });
    Comment.belongsTo(models.User, {
        as: 'User',
        foreignKey: "iduser"
    });
    Comment.belongsTo(models.Comment, {
        as: 'Comment',
        foreignKey: "idcomment"
    });
};
module.exports = Comment;