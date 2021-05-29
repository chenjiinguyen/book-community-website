module.exports = (sequelize, DataTypes) => {
  const usergroup = sequelize.define(
    "usergroup",
    {
      // Model attributes are defined here
      idgroup: {
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
      modelName: "usergroup",
      tableName: "usergroup",
      timestamps: false,
      createdAt: false,
      updatedAt: false,      
    }
  );
  usergroup.associate = (models) => {
    // usergroup.belongsToMany(models.role, { through: models.usergroup_role });

    usergroup.hasMany(models.usergroup_role, { foreignKey: "idgroup" });
  };
  return usergroup;
};
