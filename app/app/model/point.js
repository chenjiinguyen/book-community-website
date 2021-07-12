module.exports = (sequelize, DataTypes) => {
  const point = sequelize.define(
    "point",
    {
      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      idepisode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      charge: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      modelName: "point",
      tableName: "point",
    }
  );
  point.associate = (models) => {
    point.belongsTo(models.episode, { foreignKey: "idepisode" });
    point.belongsTo(models.user, { foreignKey: "username" });
  };
  return point;
};
