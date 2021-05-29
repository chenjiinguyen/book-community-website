module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define(
    "book",
    {
      // Model attributes are defined here
      idbook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      uploader: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      poster: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "book",
      tableName: "book",
      // Other model options go here
    }
  );

  book.associate = function (models) {
    //Has
    book.hasMany(models.episode,{foreignKey: "idbook"});
    book.hasMany(models.like, {foreignKey: "idbook" });
    book.hasMany(models.comment,{foreignKey: "idbook"});
    book.hasMany(models.moderation_book,{foreignKey: "idbook"});
    //Belongs
    book.belongsTo(models.category, {foreignKey: "category", as: 'categories'});
    book.belongsTo(models.user, {foreignKey: "uploader", as: 'users'});
  };

  return book;
};
