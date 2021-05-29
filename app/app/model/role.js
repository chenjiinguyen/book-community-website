module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      idrole: {
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
      modelName: "role",
      tableName: "role",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  role.associate = (models) => {
    //Has
    role.hasMany(models.usergroup_role, { foreignKey: "idrole" });
    //Belongs
    // role.belongsToMany(models.usergroup, { through: models.usergroup_role });
  };
  return role;
};
