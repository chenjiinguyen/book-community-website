const models = require("../../../model/index");
const data_controller = require("../../../../lib/data_controller");
const status = require("../../../../lib/status");

const controller = async (req, res, next) => {
  let data = await data_controller.default(req);
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
