const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    idrole: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ROLE",
    tableName: 'ROLES'
  }
);
Role.associate = (models) => {
  Role.belongsToMany(models.Usergroup, { through: models.Usergroup_Role });
};
module.exports = Role;
