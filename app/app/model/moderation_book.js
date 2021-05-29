module.exports = (sequelize, DataTypes) => {
  const moderation_book = sequelize.define(
    "moderation_book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idbook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      moderator: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      moderation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      review: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      modelName: "moderation_book",
      tableName: "moderation_book",
    }
  );

  moderation_book.associate = (models) => {
    //Belong
    moderation_book.belongsTo(models.book, { foreignKey: "idbook" });
    moderation_book.belongsTo(models.user, { foreignKey: "moderator" });
  };

  return moderation_book;
};
