const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usergroup = sequelize.define('Usergroup', {
  // Model attributes are defined here
  idgroup : {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    sequelize,
    modelName: 'USERGROUP',
    tableName: 'USERGROUPS'
});
Usergroup.associate = (models) => {
    Usergroup.belongsToMany(models.Role, { through: models.Usergroup_Role });
};
module.exports = Usergroup;