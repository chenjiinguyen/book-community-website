module.exports = (sequelize, DataTypes) => {
  const moderation_episode = sequelize.define(
    "moderation_episode",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idepisode: {
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
      modelName: "moderation_episode",
      tableName: "moderation_episode",
    }
  );

  moderation_episode.associate = (models) => {
    //Belong
    moderation_episode.belongsTo(models.book, { foreignKey: "idepisode" });
    moderation_episode.belongsTo(models.user, { foreignKey: "moderator" });
  };

  return moderation_episode;
};
