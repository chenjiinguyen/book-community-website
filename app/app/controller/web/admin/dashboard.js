
const data_controller = require("../../../../lib/data_controller");
const models = require("../../../model/index");
const status = require('../../../../lib/status');
const moment = require("moment");

module.exports = async (req, res, next) => {
  let data = await data_controller.default(req);
  data.title = "Bảng Điều Khiển";
  // data.breadcrumb = [
  //   {
  //     title: "Trang chu",
  //     link: "/admin/",
  //   },
  //   {
  //     title: "Admin",
  //     link: "/admin/",
  //   },
  //   {
  //     title: "Bang dieu khien",
  //     link: "",
  //   },
  // ];
  let categories = [
    {name: "TEXT",val : "mytexts"},
    {name: "IMAGE",val : "mycomics"},
    {name: "AUDIO",val : "myaudios"},
  ]
  data.like = 0;
  data.comment = 0;
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
    let like = data[category.val].reduce((x,y) => {
      if(!isNaN(x.like))
        return parseInt(x.like);
      return parseInt(x.like) + parseInt(y.like) + 0;
    },parseInt(0));

    let comment = data.comment + data[category.val].reduce((x,y) => {
      if(!isNaN(x.comment))
      return parseInt(x.comment)
      return parseInt(x.comment) + parseInt(y.comment) + 0;
    },parseInt(0));
    // console.log(like)
    data.like = data.like + like;
    data.comment = data.comment + comment;

  }
  // console.log(data)
  res.render("page.admin.dashboard", data);
};
