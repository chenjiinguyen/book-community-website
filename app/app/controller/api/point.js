const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");
const moment = require("moment");

const controller = {
  index: async (req, res, next) => {
    let username = req.params.username;
    let result = {};
    let data = [];
    if (username != null) {
      data = await models.point.findAll({
        attributes: {
          include: [
            [
              models.sequelize.literal(
                "(SELECT `name` FROM `episode` WHERE `episode`.`idepisode` = `point`.`idepisode`)"
              ),
              "episode",
            ],
            [
              models.sequelize.literal(
                "(SELECT `b`.`title` FROM `book` AS `b`, `episode` AS `e` WHERE `e`.`idbook` = `b`.`idbook` AND `e`.`idepisode` = `point`.`idepisode`)"
              ),
              "book",
            ],
          ],
          exclude: ["idepisode"],
        },
        where: { username: username },
      });
      result = {
        ...type.SUCCESS,
        data: data,
      };
    } else {
      result = {
        ...type.NOT_FOUND,
      };
    }
    return res.json(result);
  },
  mePoint: async (req, res, next) => {
    let me = req.user;
    let result = {};
    let data = [];
    if (me != null) {
      data = await models.point.findAll({
        attributes: {
          include: [
            [
              models.sequelize.literal(
                "(SELECT `name` FROM `episode` WHERE `episode`.`idepisode` = `point`.`idepisode`)"
              ),
              "episode",
            ],
            [
              models.sequelize.literal(
                "(SELECT `b`.`title` FROM `book` AS `b`, `episode` AS `e` WHERE `e`.`idbook` = `b`.`idbook` AND `e`.`idepisode` = `point`.`idepisode`)"
              ),
              "book",
            ],
          ],
          exclude: ["idepisode"],
        },
        where: { username: me.username },
      });
      result = {
        ...type.SUCCESS,
        data: data,
      };
    } else {
      result = {
        ...type.NOT_FOUND,
      };
    }
    return res.json(result);
  },
};

module.exports = controller;
