module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    "like",
    {
      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      idbook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      modelName: "like",
      tableName: "like",
    }
  );
  like.associate = (models) => {
    //Belong
    like.belongsTo(models.book, { foreignKey: "idbook" });
    like.belongsTo(models.user, { foreignKey: "username" });
  };

  return like;
};
