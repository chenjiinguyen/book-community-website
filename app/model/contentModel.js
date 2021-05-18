const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
    idcontent : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idepisode : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
    }

},{
    sequelize,
    modelName: 'CONTENT',
  // Other model options go here
});

module.exports = Content;