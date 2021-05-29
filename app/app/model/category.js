module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      idcategory: {
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
      modelName: "category",
      tableName: "category",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  category.associate = (models) => {
    // Has
    category.hasMany(models.book, { foreignKey: "category"});
  };
  return category;
};
