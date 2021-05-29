const models = require("../../../model/index");
const dataController = require("../../../../lib/dataController");
const utils = require("../../../../lib/utils");
const status = require("../../../../lib/status");

module.exports.create = {
  get: async (req, res, next) => {
    let id = req.params.id;
    let data = await dataController.default(req);
    data.book = await models.book.findOne({
      where: {
        idbook: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    data.title = "Gửi Bản Thảo Chương";
    res.render("page.admin.episode.text.create", data);
  },
  post: async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    console.log(data);
    let book = await models.book.findOne({
      where: {
        idbook: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    if (book) {
      if (data.name.length == 0 || data.content.length == 0) {
        if (data.name.length == 0)
          req.flash("error", "Vui lòng điền tên chương");
        if (data.content.length == 0)
          req.flash("error", "Vui lòng điền nội dung");
        res.redirect("/admin/book/" + id + "/create");
      } else {
        let chapOfBook = await models.episode.findAll({
          where: { idbook: id },
          raw: true,
        });
        let index = (chapOfBook.length == 0)?1:Math.max(...chapOfBook.map((x) => x.index)) + 1;
        let episode = await models.episode.create({
          idbook: id,
          index: index,
          name: data.name,
          content: data.content,
          status: data.status,
        });
        if (episode) {
          if(data.status == status.PENDING){
            await models.moderation_episode.create({
                idepisode: episode.idepisode
            });
          }
          req.flash("success", "Gửi bản thảo thành công.");
          res.redirect("/admin/book/" + id + "/success");
        } else {
          req.flash("error", "Có lỗi trong quá trình đăng");
          res.redirect("/admin/book/" + id + "/create");
        }
      }
    } else {
      req.flash("error", "Sách không tồn tại");
      res.redirect("/admin/");
    }
  },
};

module.exports.edit = {
    get: async (req, res, next) => {
        let id = req.params.id;
        let data = await dataController.default(req);
        data.episode = await models.episode.findOne({
          where: {
            idepisode: id,
            status: {
              [models.Sequelize.Op.not]: status.DELETED,
            },
          },
          raw: true,
        });
        data.title = "Chỉnh Sửa Chương";
        res.render("page.admin.episode.text.edit", data);
    },
    post : async (req, res, next) => {

        
    }
}
