const models = require("../../../../model/index");
const ultis = require("../../../../../lib/utils");
const status = require("../../../../../lib/status");
const data_controller = require("../../../../../lib/data_controller");
const moment = require("moment");

const controller = async (req, res, next) => {
  let data = await data_controller.default(req);
  let bookId = req.params.bookId;
  let episodeId = req.params.episodeId;

  await ultis.update_view(episodeId, false);
  data.book = await models.book.findOne({
    attributes: {
      include: [
        [
          models.sequelize.literal(
            "(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)"
          ),
          "like",
        ],
      ],
      exclude: ["status"],
    },
    where: { idbook: bookId, status: status.ACCEPT },
    raw: true,
  });
  data.content = await models.episode.findOne({
    where: { idepisode: episodeId, idbook: bookId, status: status.ACCEPT },
    raw: true,
  });
  data.episodes = await models.episode.findAll({
    where: { idbook: bookId, status: status.ACCEPT },
    attributes: ["idepisode", "idbook", "name", "view", "updatedAt"],
    raw: true,
  });
  if (data.book.category == "IMAGE") {
    data.content.images = ultis.split_content(data.content.content);
  }
  data.title = data.book.title + " - " + data.content.name;
  res.render("page.web.book.view", data);
};

module.exports = controller;
