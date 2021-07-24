const models = require("../../../model/index");
const data_controller = require("../../../../lib/data_controller");
const status = require("../../../../lib/status");

const controller = async (req, res, next) => {
  let id = req.params.category.toUpperCase();
  let data = await data_controller.default(req);
  category = await models.category.findOne({
    where: {
        idcategory: id,
    },
  })
  if(category){
    data.name = category.name
    data.title = category.name;
    data.books = await models.book.findAll({
      attributes: {
          include:[[models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like']],
          exclude: ['status']
      },
      where: {
          category: id,
          status: status.ACCEPT,
      },
      order: [
          ['createdat', 'DESC'],
      ],
      raw: true,
    });
    
    res.render("page.web.category", data);
  }else{
    req.flash("error", "Không có thể loại sách này");
    res.redirect("/");
  }
  
};

module.exports = controller;
