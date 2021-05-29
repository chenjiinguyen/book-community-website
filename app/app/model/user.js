const userGroup = require("../../lib/userGroup");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      usergroup: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: userGroup.MEMBER,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      modelName: "user",
      tableName: "user",
      hooks: {
        beforeCreate: async (user, options) => {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        },
        beforeCreate: async (user, options) => {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        },
      },
      // Other model options go here
    }
  );
  
  user.associate = (models) => {
    //Has
    user.hasMany(models.book, { foreignKey: "uploader" });
    user.hasMany(models.point, { foreignKey: "username" });
    user.hasMany(models.like, { foreignKey: "username" });
    user.hasMany(models.comment, { foreignKey: "iduser" });
    user.hasMany(models.moderation_book, { foreignKey: "moderator" });
    user.hasMany(models.moderation_episode, { foreignKey: "moderator" });
    //Belongs
    user.belongsTo(models.usergroup, { foreignKey: "usergroup" , as: "idgroup"});
  };

  user.prototype.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };

  return user;
};
