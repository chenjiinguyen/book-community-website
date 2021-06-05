const models = require("../../../model/index");
const data_controller = require("../../../../lib/data_controller");
const utils = require("../../../../lib/utils");
const status = require("../../../../lib/status");
const moment = require("moment");
const { book } = require("./censor");

module.exports.create = {
  get: async (req, res, next) => {
    let data = await data_controller.default(req);
    data.category = req.query.category;
    data.title = "Gửi Bản Thảo";
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
    res.render("page.admin.book.create", data);
  },
  post: async (req, res, next) => {
    let require_fields = ["title", "author", "category","description"];
    let data = req.body;
    if (utils.check_properties_in_object(require_fields, data)) {
      if (!utils.check_not_blank_in_object(require_fields,data)) {
        if (data.title.length == 0)
          req.flash("error", "Vui lòng điền tên tác phẩm");
        if (data.author.length == 0)
          req.flash("error", "Vui lòng điền tên tác giả");
        if (data.description.length == 0)
          req.flash("error", "Vui lòng điền giới thiệu về tác phẩm");
        res.redirect("/admin/book/create");
      } else {
        data.poster = checkLink(data.poster)
          ? data.poster
          : "https://i.imgur.com/ds209S4.jpg";
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
    let data = await data_controller.default(req);
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
    data.title = "Chi Tiết Bản Thảo";
    res.render("page.admin.book.content", data);
  },
};

module.exports.delete = {
  book: async (req, res, next) => {
    let id = req.params.id;
    let book = await models.book.findOne({
      where: {
        idbook: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
    });
    if (book) {
      book.status = status.DELETED;

      await book.save({ silent: true });
      req.flash("success", "Xóa sách thành công");
      res.redirect("/admin/");
    } else {
      req.flash("error", "Sách không tồn tại");
      res.redirect("/admin/");
    }
  },
  episode: async (req, res, next) => {
    let id = req.params.id;
    let episode = await models.episode.findOne({
      include: [
        {
          model: models.book,
          as: "books",
          attributes: ["uploader"],
        },
      ],
      where: {
        idepisode: id,
        status: {
          [models.Sequelize.Op.not]: status.DELETED,
        },
      },
    });
    if (episode) {
      if (episode.books.uploader == req.user.username) {
        episode.status = status.DELETED;

        await episode.save({ silent: true });
        req.flash("success", "Xóa chương thành công");
        res.redirect("/admin/book/" + episode.idbook + "/detail");
      } else {
        req.flash("error", "Bạn không phải tác giả của sách");
        res.redirect("/admin/book/" + episode.idbook + "/detail");
      }
    } else {
      req.flash("error", "Sách không tồn tại");
      res.redirect("/admin/");
    }
  },
};

module.exports.edit = {
  get: async (req, res, next) => {
    let idbook = req.params.id;
    let data = await data_controller.default(req);
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
    if (data.book) {
      res.render("page.admin.book.edit", data);
    } else {
      req.flash("error", "Sách không tồn tại");
      res.redirect("/admin/");
    }
  },
  post: async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let require_fields = ["title", "author","description"];
    if (utils.check_properties_in_object(require_fields, data)) {
      if (utils.check_not_blank_in_object(require_fields,data)) {
        if (data.title.length == 0)
          req.flash("error", "Vui lòng điền tên tác phẩm");
        if (data.author.length == 0)
          req.flash("error", "Vui lòng điền tên tác giả");
        if (data.description.length == 0)
          req.flash("error", "Vui lòng điền giới thiệu về tác phẩm");
        res.redirect("/admin/book/create");
      } else {
        data.poster = checkLink(data.poster)
          ? data.poster
          : "https://i.imgur.com/ds209S4.jpg";
        let book = await models.book.findOne({
          where: {
            idbook: id,
            status: {
              [models.Sequelize.Op.not]: status.DELETED,
            },
          },
        });
        if (book) {
          book.title = data.title;
          book.author = data.author;
          book.poster = data.poster;
          book.description = data.description;
          await book.save({ silent: true });

          req.flash("success", "Chỉnh sửa sách thành công.");
          res.redirect("/admin/book/" + book.idbook + "/detail");
        } else {
          req.flash("error", "Sách không tồn tại");
          res.redirect("/admin/");
        }
      }
    } else {
      req.flash("error", "Vui lòng điền tất cả các trường bắt buộc");
      res.redirect("/admin/book/create");
    }
  },
};

module.exports.success = {
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
  },
};

function checkLink(url) {
  let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|mp3)([/|.|\w|\s|-])*/;
  check = url.match(regex);
  return check;
}
