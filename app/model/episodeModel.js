const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Episode = sequelize.define('Episode', {
    idepisode : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idbook : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    view: {
        type: DataTypes.INTEGER,
    }

},{
    sequelize,
    modelName: 'EPISODE',
  // Other model options go here
});

module.exports = Episode;