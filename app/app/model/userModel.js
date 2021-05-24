const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const userGroup = require("../../lib/userGroup");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    usergroup: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: userGroup.MEMBER,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "USER",
    hooks: {
      afterSave: async (user, options) => {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      },
      afterCreate: async (user, options) => {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      },
    },
    // Other model options go here
  }
);
// Adding an instance level methods.
User.prototype.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = User;
