const models = require("../../../model/index");
const dataController = require("../../../../lib/dataController");
const status = require("../../../../lib/status");

const controller = async (req, res, next) => {
  let data = await dataController.default(req);
  data.title = "Trang chủ";
  data.new_manga = await models.book.findAll({
    attributes: {
        include:[[models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like']],
        exclude: ['status']
    },
    where: {
        category: "IMAGE",
        status: status.ACCEPT,
    },
    order: [
        ['createdat', 'DESC'],
    ],
    limit: 10,
    raw: true,
  });
  data.new_textbook = await models.book.findAll({
    attributes: {
        include:[[models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like']],
        exclude: ['status']
    },
    where: {
        category: "TEXT",
        status: status.ACCEPT,
    },
    order: [
        ['createdat', 'DESC'],
    ],
    limit: 10,
    raw: true,
  });
  res.render("page.web.index", data);
};

module.exports = controller;
