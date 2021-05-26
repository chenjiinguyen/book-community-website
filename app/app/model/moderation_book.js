const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Book = require("./book");
const User = require("./user");

const Moderation_Book = sequelize.define("Moderation_Book", {
  idbook: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Book,
      key: "idbook",
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

Moderation_Book.associate = (models) => {
    Moderation_Book.belongsTo(models.Book, {
        as: 'Book',
        foreignKey: "idbook"
    });
    Moderation_Book.belongsTo(models.User, {
        as: 'User',
        foreignKey: "moderator"
    });
};

module.exports = Moderation_Book;