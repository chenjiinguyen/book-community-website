const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Episode = sequelize.define('Episode', {
    idepisode : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    content: {
        type: DataTypes.STRING,
    },
    view: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },


},{
    sequelize,
    modelName: 'EPISODE',
    tableName: "EPISODES",
  // Other model options go here
});

module.exports = Episode;