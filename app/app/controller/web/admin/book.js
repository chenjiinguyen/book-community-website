const models = require("../../../model/index");
const dataController = require("../../../../lib/dataController");
const utils = require("../../../../lib/utils");
const status = require("../../../../lib/status");
const moment = require("moment");

module.exports.create = {
  get: async (req, res, next) => {
    let data = await dataController.default(req);
    data.title = "Gửi Bản Thảo";
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
    res.render("page.admin.book.create", data);
  },
  post: async (req, res, next) => {
    let require_fields = ["title", "author", "category"];
    let data = req.body;
    if (utils.checkPropertiesInObject(require_fields, data)) {
      if (data.title.length == 0 || data.author.length == 0) {
        if (data.title.length == 0)
          req.flash("error", "Vui lòng điền tên tác phẩm");
        if (data.author.length == 0)
          req.flash("error", "Vui lòng điền tên tác giả");
        res.redirect("/admin/book/create");
      } else {
        data.poster = checkLink(data.poster)
          ? data.poster
          : "http://e-library.stkipsingkawang.ac.id/assets/cover/no_image_book.jpg";
        let book = await models.book.create({
          title: data.title,
          author: data.author,
          uploader: req.user.username,
          category: data.category,
          poster: data.poster,
          description: data.description,
          status: status.PENDING,
        });
        if (book) {
          let mod = await models.moderation_book.create({
            idbook: book.idbook,

          });
          req.flash("success", "Gửi bản thảo thành công.");
          res.redirect("/admin/book/" + book.idbook + "/create");
        } else {
          req.flash("error", "Có lỗi trong quá trình đăng");
          res.redirect("/admin/book/create");
        }
      }
    } else {
      req.flash("error", "Vui lòng điền tất cả các trường bắt buộc");
      res.redirect("/admin/book/create");
    }
  },
};

module.exports.detail = {
  get: async (req, res, next) => {
    let idbook = req.params.id;
    let data = await dataController.default(req);
    data.book = await models.book.findOne({
      include: [
        {
          // Notice `include` takes an ARRAY
          model: models.category,
          as: "categories",
          attributes: ["name"],
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

    data.episodes = (
      await models.episode.findAll({
        where: {
          idbook: idbook,
          status: {
            [models.Sequelize.Op.not]: status.DELETED,
          },
        },
        attributes: ["idepisode", "idbook", "name", "view","status", "content", "updatedAt"],
        order: [["index", "DESC"]],
        raw: true,
      })
    ).map((x, y) => {
      x.i = y;
      x.updatedAt = moment(x.updatedAt).format("DD-MM-YYYY");
      return x;
    });
    data.title = "Chi Tiết Bản Thảo";
    res.render("page.admin.book.content", data);
  },

};

module.exports.edit = {
  get: async (req, res, next) => {
    let idbook = req.params.id;
    let data = await dataController.default(req);
    data.title = "Chỉnh Sửa Bản Thảo";
    data.book = await models.book.findOne({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["name"],
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
    res.render("page.admin.book.edit", data);
  }
}

module.exports.success = {
  get: async (req,res,next) => {
    let idbook = req.params.id;
    let data = await dataController.default(req);
    data.book = await models.book.findOne({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["name"],
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

    data.title = "Gửi Bản Thảo Thành Công";
    res.render("page.admin.book.success", data);
  }
}

function checkLink(url) {
  let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|mp3)([/|.|\w|\s|-])*/;
  check = url.match(regex);
  return check;
}
