const models = require("../../../model/index");
const dataController = require("../../../../lib/dataController");
const status = require("../../../../lib/status");

const controller = async (req, res, next) => {
  let data = await dataController.default(req);
  data.title = "Trang chủ";
  let categories = [
    { name: "TEXT", val: "new_textbook" },
    { name: "IMAGE", val: "new_manga" },
    { name: "AUDIO", val: "new_audiobook" },
  ];
  for (const category of categories) {
      data[category.val] = await models.book.findAll({
        attributes: {
            include:[[models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like']],
            exclude: ['status']
        },
        where: {
            category: category.name,
            status: status.ACCEPT,
        },
        order: [
            ['createdat', 'DESC'],
        ],
        limit: 10,
        raw: true,
      });
  }
  res.render("page.web.index", data);
};

module.exports = controller;
