const models = require("../../../model/index");
const data_controller = require("../../../../lib/data_controller");
const utils = require("../../../../lib/utils");
const status = require("../../../../lib/status");
const moment = require("moment");
const axios = require("axios");
const FormData = require('form-data');

module.exports.all = {
  get: async (req, res, next) => {
    let data = await data_controller.default(req);
    data.title = "Kiểm Duyệt";
    let categories = [
      { name: "TEXT", val: "mytexts" },
      { name: "IMAGE", val: "mycomics" },
      { name: "AUDIO", val: "myaudios" },
    ];
    let query =
      "SELECT `idbook`, `title`, `author`, `uploader`, `category`, `poster`, `status`, `view`, `book`.`createdat`, `book`.`updatedat`, `user`.`name` AS `users_name` FROM `book`, `user` WHERE `uploader` = `username` AND( `idbook` IN( SELECT `idbook` FROM `moderation_book` WHERE `review` = 0 GROUP BY `idbook` ) OR `idbook` IN( SELECT `idbook` FROM `episode` WHERE `idepisode` IN( SELECT `idepisode` FROM `moderation_episode` WHERE `review` = 0 GROUP BY `idepisode` ) GROUP BY `idbook` ) )";
    let books = (
      await models.sequelize.query(query, {
        model: models.book,
        mapToModel: true,
        raw: true,
      })
    ).map((x) => {
      x.createdAt = moment(x.createdAt).format("DD-MM-YYYY");
      x.updatedAt = moment(x.updatedAt).format("DD-MM-YYYY");
      for (const key in x) {
        let newkey = key.replace(".", "_");
        if (newkey !== key) {
          x[newkey] = x[key];
          delete x[key];
        }
      }
      return x;
    });
    for (const category of categories) {
      data[category.val] = books.filter((o) => o.category == category.name);
      // console.log(data[category.val]);
    }
    res.render("page.admin.censor.list", data);
  },
};

module.exports.detail = {
  get: async (req, res, next) => {
    let idbook = req.params.id;
    let data = await data_controller.default(req);
    data.book = await models.book.findOne({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["name"],
        },
        {
          model: models.episode,
          as: "episodes",
          attributes: [],
          include: [
            {
              model: models.moderation_episode,
              as: "moderation_episodes",
              attributes: [],
              where: {
                review: 0,
              },
            },
          ],
        },
      ],
      where: {
        idbook: idbook,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    if (data.book) {
      data.episodes = (
        await models.episode.findAll({
          include: [
            {
              model: models.moderation_episode,
              as: "moderation_episodes",
              attributes: [],
              where: {
                review: 0,
              },
            },
          ],
          where: {
            idbook: idbook,
            status: {
              [models.Sequelize.Op.not]: status.DELETED,
            },
          },
          attributes: [
            "idepisode",
            "idbook",
            "name",
            "view",
            "status",
            "content",
            "updatedAt",
          ],
          order: [["index", "DESC"]],
          raw: true,
        })
      ).map((x, y) => {
        x.i = y;
        x.updatedAt = moment(x.updatedAt).format("DD-MM-YYYY");
        return x;
      });
      data.book.censor = (await models.moderation_book.findOne({
        where: {
          idbook: idbook,
          review: 0,
        },
      }))
        ? true
        : false;

      data.title = "Kiểm Duyệt Truyện";
      res.render("page.admin.censor.detail", data);
    } else {
      req.flash("error", "Sách không tồn tại");
      res.redirect("/admin/censor");
    }
  },
};

module.exports.book = {
  get: async (req, res, next) => {
    let idbook = req.params.id;
    let data = await data_controller.default(req);
    data.title = "Kiểm Duyệt Nội Dung Sách";
    data.book = await models.book.findOne({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["name"],
        },
        {
          model: models.moderation_book,
          as: "moderation_books",
          attributes: [],
          where: {
            review: 0,
          },
        },
      ],
      where: {
        idbook: idbook,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    if (data.book) {
      res.render("page.admin.book.verify", data);
    } else {
      req.flash("error", "Sách không có yêu cầu kiểm duyệt hoặc đã kiểm duyệt rồi");
      res.redirect("/admin/censor");
    }
  },
  post: async (req, res, next) => {
    let idbook = req.params.id;
    let data = req.body;
    let book = await models.book.findOne({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["name"],
        },
        {
          model: models.moderation_book,
          as: "moderation_books",
          attributes: [],
          where: {
            review: 0,
          },
        },
      ],
      where: {
        idbook: idbook,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
    });
    let role = req.user.roles.find((o) => o.idrole === "KIEMDUYET");
    if (role) {
      if (book) {
        let censor = await models.moderation_book.findOne({
          where: {
            review: 0,
            idbook: idbook,
          },
        });
        if (censor) {
          censor.moderator = req.user.username;
          censor.moderation = data.status;
          censor.content = data.description;
          censor.review = 1;
          book.status = data.status;
          await book.save();
          await censor.save();
          let url = "https://fcm.googleapis.com/fcm/send";
          let fcmKey = "AAAAb3t5DKk:APA91bGn5Ak41jMmR_aDvfX6r4JmjmYvtau01IG7hVKWqInfWYQBR2lG97pKLrNi0oAaONgSGLdCViXFiXUrzqg-IseCqhfvPCke96nkfrT3xpdijmancwN_2jU5uKuh90ikgenqzQkB";
          let device_noti = (await models.device.findAll({raw:true})).map((x) => x.token);
          let data_noti = {
            data: {
              id : book.idbook,
              book : book.title,
            },
            registration_ids: device_noti,
          };
          const request_config = {
            method: "post",
            url: url,
            headers: {
                "Authorization": "key=" + fcmKey,
                "Content-Type": "application/json"
            },
            data: data_noti
          };
          let response = await axios(request_config);
 
          req.flash("success", "Kiểm duyệt thành công");
          res.redirect("/admin/censor/book/" + idbook);
        } else {
          req.flash(
            "error",
            "Không có đơn gửi kiểm duyệt cho nội dung sách này"
          );
          res.redirect("/admin/censor");
        }
      } else {
        req.flash("error", "Sách không tồn tại");
        res.redirect("/admin/censor");
      }
    } else {
      req.flash("error", "Bạn không có quyền truy cập vào chức năng này");
      res.redirect("/admin/");
    }
  },
};


module.exports.episode = {
  get: async(req,res,next)=>{
    let id = req.params.id;
    let data = await data_controller.default(req);
    data.title = "Kiểm Duyệt Nội Dung Sách";
    data.episode = await models.episode.findOne({
      include: [
        {
          model: models.moderation_episode,
          as: "moderation_episodes",
          attributes: [],
          where: {
            review: 0,
          },
        },
      ],
      where: {
        idepisode: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    let book = await models.book.findOne({
      where: {
        idbook: data.episode.idbook,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
      raw: true,
    });
    if (data.episode) {
      switch (book.category) {
        case "TEXT":
          res.render("page.admin.episode.text.verify", data);
          break;
        case "IMAGE":
          data.episode.images = data.episode.content.split("|");
          res.render("page.admin.episode.image.verify", data);
          break;
        case "AUDIO":
          res.render("page.admin.episode.audio.verify", data);
          break;
        default:
          req.flash("error", "Có lỗi thông tin sách");
          res.redirect("/admin/");
          break;
      }
    } else {
      req.flash("error", "Chương không có yêu cầu kiểm duyệt hoặc đã kiểm duyệt rồi");
      res.redirect("/admin/censor/book/"+book.idbook+"/detail");
    }
  },
  post: async(req,res,next) => {
    let id = req.params.id;
    let data = req.body;
    let episode = await models.episode.findOne({
      include: [
        {
          model: models.moderation_episode,
          as: "moderation_episodes",
          attributes: [],
          where: {
            review: 0,
          },
        },
      ],
      where: {
        idepisode: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
    });
    let role = req.user.roles.find((o) => o.idrole === "KIEMDUYET");
    if (role) {
      if (episode) {
        let censor = await models.moderation_episode.findOne({
          where: {
            review: 0,
            idepisode: id,
          },
        });
        if (censor) {
          censor.moderator = req.user.username;
          censor.moderation = data.status;
          censor.content = data.description;
          censor.review = 1;
          episode.status = data.status;
          await episode.save();
          await censor.save();
          let book = await models.book.findOne({where: {idbook: episode.idbook}, raw: true});
          let url = "https://fcm.googleapis.com/fcm/send";
          let fcmKey = "AAAAb3t5DKk:APA91bGn5Ak41jMmR_aDvfX6r4JmjmYvtau01IG7hVKWqInfWYQBR2lG97pKLrNi0oAaONgSGLdCViXFiXUrzqg-IseCqhfvPCke96nkfrT3xpdijmancwN_2jU5uKuh90ikgenqzQkB";
          let device_noti = (await models.device.findAll({raw:true})).map((x) => x.token);
          let data_noti = {
            data: {
              id : book.idbook,
              book : book.title,
              episode : episode.name,
            },
            registration_ids: device_noti,
          };
          const request_config = {
            method: "post",
            url: url,
            headers: {
                "Authorization": "key=" + fcmKey,
                "Content-Type": "application/json"
            },
            data: data_noti
          };
          let response = await axios(request_config);
          req.flash("success", "Kiểm duyệt thành công");
          res.redirect("/admin/censor/book/" + episode.idbook);
        } else {
          req.flash(
            "error",
            "Không có đơn gửi kiểm duyệt cho nội dung chương sách này"
          );
          res.redirect("/admin/censor");
        }
      } else {
        req.flash("error", "Chương không tồn tại");
        res.redirect("/admin/censor");
      }
    } else {
      req.flash("error", "Bạn không có quyền truy cập vào chức năng này");
      res.redirect("/admin/");
    }
  }
}