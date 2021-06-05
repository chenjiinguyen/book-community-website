const models = require("../../../model/index");
const data_controller = require("../../../../lib/data_controller");
const utils = require("../../../../lib/utils");
const status = require("../../../../lib/status");

module.exports.create = {
  get: async (req, res, next) => {
    let id = req.params.id;
    let data = await data_controller.default(req);
    data.book = await models.book.findOne({
      where: {
        idbook: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    if(data.book){
        data.title = "Gửi Bản Thảo Chương";
        switch (data.book.category) {
          case "TEXT":
            res.render("page.admin.episode.text.create", data);
            break;
          case "IMAGE":
            res.render("page.admin.episode.image.create", data);
            break;
          case "AUDIO":
            res.render("page.admin.episode.audio.create", data);
            break;
          default:
            req.flash("error", "Có lỗi thông tin sách");
            res.redirect("/admin/");
            break;
        }
      }else{
        req.flash("error", "Sách không tồn tại");
        res.redirect("/admin/");
      }    
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

      if (!utils.check_not_blank_in_object(["name","content"],data)) {
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
        let content = "";
        switch (book.category) {
          case "IMAGE":
            let regex__images = new RegExp(/^(http(s?):).*.(?:jpg|png)([/|.|w|s|-])*$/);
            data.content.split("|").map(x => {
              if(x.match(regex__images) == null)
              {
                req.flash("error", "Link ảnh bị lỗi");
                res.redirect("/admin/book/" + id + "/create");
              }
            });
            break;
          case "AUDIO":
            let regex__youtube = new RegExp('^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*');
            if(data.content.match(regex__youtube) == null)
            {
              req.flash("error", "Link Youtube bị lỗi");
              res.redirect("/admin/book/" + id + "/create");
            }
            break;
          default:
            break;
        }
        content = data.content;
        let episode = await models.episode.create({
          idbook: id,
          index: index,
          name: data.name,
          content: content,
          status: data.status,
        });
        if (episode) {
          if(data.status == status.PENDING){
            await models.moderation_episode.create({
                idepisode: episode.idepisode
            });
          }
          req.flash("success", "Gửi bản thảo thành công");
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
        let data = await data_controller.default(req);
        data.episode = await models.episode.findOne({
          include:[
            {
              model: models.book,
              as: "books",
              attributes: ["category"],
            }
          ],
          where: {
            idepisode: id,
            status: {
              [models.Sequelize.Op.not]: status.DELETED,
            },
          },
          raw: true,
        });
        data.title = "Chỉnh Sửa Chương";
        if(data.episode){
          switch (data.episode["books.category"]) {
            case "TEXT":
              res.render("page.admin.episode.text.edit", data);
              break;
            case "IMAGE":
              res.render("page.admin.episode.image.edit", data);
              break;
            case "AUDIO":
              res.render("page.admin.episode.audio.edit", data);
              break;
            default:
              req.flash("error", "Có lỗi thông tin chương");
              res.redirect("/admin/");
              break;
          }
        }else{
          req.flash("error","Chương không tồn tại")
          res.redirect("/admin/")
        }
    },
    post : async (req, res, next) => {

        
    }
}
