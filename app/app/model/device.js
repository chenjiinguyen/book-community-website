module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define(
      "device",
      {
        // Model attributes are defined here
        token: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        modelName: "device",
        tableName: "device",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );

    return device;
};
  