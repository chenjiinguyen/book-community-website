const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

var models = [
    'book',
    'category',
    'comment',
    'episode',
    'moderation_book',
    'moderation_episode',
    'like',
    'point',
    'role',
    'user',
    'usergroup',
    'usergroup_role',
];

models.forEach(function(model) {
    module.exports[model] = require("./"+model);
});

module.exports.sequelize = sequelize;