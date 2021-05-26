const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Episode = require("./episode");
const User = require("./user");

const Moderation_Episode = sequelize.define("Moderation_Episode", {
  idepisode: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Episode,
      key: "idepisode",
    },
  },
  moderator: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: "username",
    },
  },
  moderation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    sequelize,
    modelName: 'MODERATION_BOOK',
    tableName: 'MODERATION_BOOKS'
});

Moderation_Episode.associate = (models) => {
    Moderation_Episode.belongsTo(models.Book, {
        as: 'Book',
        foreignKey: "idbook"
    });
    Moderation_Episode.belongsTo(models.User, {
        as: 'User',
        foreignKey: "moderator"
    });
};

module.exports = Moderation_Episode;