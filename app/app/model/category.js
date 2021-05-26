const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
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
    modelName: "CATEGORY",
    tableName: 'CATEGORIES'
  }
);
Category.associate = (models) => {
  Category.belongsToMany(models.Usergroup, { through: models.Usergroup_Category });
};
module.exports = Category;
