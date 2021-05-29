module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      // Model attributes are defined here
      idcomment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      iduser: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      idbook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "comment",
      tableName: "comment",
    }
  );

  comment.associate = (models) => {
    //Has
    comment.hasMany(models.comment,{foreignKey: "parent"})
    //Belong
    comment.belongsTo(models.book, { foreignKey: "idbook" });
    comment.belongsTo(models.user, { foreignKey: "iduser" });
    comment.belongsTo(models.comment, { foreignKey: "idcomment" });
  };
  return comment;
};
