module.exports = (sequelize, DataTypes) => {
  const usergroup_role = sequelize.define(
    "usergroup_role",
    {
      // Model attributes are defined here
      idgroup: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      idrole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      modelName: "usergroup_role",
      tableName: "usergroup_role",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  usergroup_role.associate = (models) => {
    //Belong
    usergroup_role.belongsTo(models.usergroup, { foreignKey: "idgroup" });
    usergroup_role.belongsTo(models.role, { foreignKey: "idrole" });
  };
  return usergroup_role;
};
