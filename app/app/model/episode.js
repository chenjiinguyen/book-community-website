module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define(
    "episode",
    {
      idepisode: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idbook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      view: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      modelName: "episode",
      tableName: "episode",
      // Other model options go here
    }
  );
  episode.associate = (models) => {
    //Has
    episode.hasMany(models.point, {foreignKey: "idepisode"});
    episode.hasMany(models.moderation_episode, {foreignKey: "idepisode"});
    //Belong
    episode.belongsTo(models.book, { foreignKey: "idbook" });
  };

  return episode;
};
