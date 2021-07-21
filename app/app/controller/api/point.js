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
        order: [
          ['createdat', 'DESC'],['updatedat', 'DESC'],
        ],
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
        order: [
          ['createdat', 'DESC'],['updatedat', 'DESC'],
        ],
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
  addPoint: async (req, res, next) => {
    let me = req.user;
    let { idepisode, charge, point } = req.body;
    let result = {};
    if (me != null) {
      let username = me.username;
      charge = charge == "true" ? true : false;
      let data = {
        username,
        idepisode,
        charge,
        point,
      };
      let trans = await models.point.findOne({
        where: { username, idepisode },
      });
      if (trans) {
        result = {
          ...type.BAD_REQUEST,
        };
      } else {
        let point_result = await models.point.create(data);
        if (point_result) {
          me.point = charge ? parseInt(me.point) + parseInt(point) : parseInt(me.point) - (point);
          await me.save();
          result = {
            ...type.SUCCESS,
            data: point_result,
          };
        } else {
          result = {
            ...type.BAD_REQUEST,
          };
        }
      }
    } else {
      result = {
        ...type.NOT_FOUND,
      };
    }
    return res.json(result);
  },
};

module.exports = controller;
