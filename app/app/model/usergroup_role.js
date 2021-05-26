const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const Usergroup = require('./usergroup');

const Usergroup_Role = sequelize.define('Usergroup_Role', {
  // Model attributes are defined here
  idgroup : {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
        model: Usergroup,
        key: "idgroup"
    }
 
  },idrole: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
        model: Role,
        key: "idrole"
    }
  }
}, {
    sequelize,
    modelName: 'USERGROUP_ROLE',
    tableName: 'USERGROUP_ROLES'
});
// Usergroup_Role.associate = (models) => {
//     Usergroup_Role.belongsTo(models.Usergroup, {
//         as: 'Usergroup',
//         foreignKey: "Usergroup"
//     });
//     Usergroup_Role.belongsTo(models.Role, {
//         as: 'Role',
//         foreignKey: "idrole"
//     });
// };
module.exports = Usergroup_Role;