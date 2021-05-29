
const dataController = require("../../../../lib/dataController");
const models = require("../../../model/index");
const status = require('../../../../lib/status');
const moment = require("moment");

module.exports = async (req, res, next) => {
  let data = await dataController.default(req);
  data.title = "Bảng Điều Khiển";
  data.breadcrumb = [
    {
      title: "Trang chu",
      link: "/admin/",
    },
    {
      title: "Admin",
      link: "/admin/",
    },
    {
      title: "Bang dieu khien",
      link: "",
    },
  ];
  let categories = [
    {name: "TEXT",val : "mytexts"},
    {name: "IMAGE",val : "mycomics"},
    {name: "AUDIO",val : "myaudios"},
  ]

  for (const category of categories) {
    data[category.val] = (await models.book.findAll({
      attributes: {
          include:[
              [models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like'],
              [models.sequelize.literal('(SELECT COUNT(`comment`.`idbook`) FROM `comment` WHERE `comment`.`idbook` = `book`.`idbook`)'), 'comment'],
            ],
      },
      where: {
          uploader: req.user.username,
          category: category.name,
          status: {
            [models.Sequelize.Op.not] : status.DELETED
          },
          
      },
      order: [
          ['updatedAt', 'DESC'],
      ],
      raw: true,
    })).map(x => {
      x.createdAt = moment(x.createdAt).format("DD-MM-YYYY");
      x.updatedAt = moment(x.updatedAt).format("DD-MM-YYYY");
      return x;
  })
  }
  res.render("page.admin.dashboard", data);
};
