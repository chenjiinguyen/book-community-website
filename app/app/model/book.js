const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Like = require('./like');

const Book = sequelize.define('Book', {
  // Model attributes are defined here
  idbook: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  uploader: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  poster: {
      type: DataTypes.STRING,
      allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
},
  status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
  },
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
    sequelize,
    modelName: 'BOOK',
    tableName: "BOOKS",
  // Other model options go here
});

  
Book.associate = function(models) {
  
};



module.exports = Book;