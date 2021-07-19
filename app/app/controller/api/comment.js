const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");

const controller = {
  index: async (req, res, next) => {
    let id = req.params.id;
    let data = {};
    let result = {};
    if (id != null) {
      result = await models.comment.findAll({
        attributes: {
          include: [
            [
              models.sequelize.literal(
                "(SELECT `user`.`name` FROM `user` WHERE `user`.`username` = `comment`.`iduser`)"
              ),
              "name",
            ],
            [
                models.sequelize.literal(
                  "(SELECT `user`.`avatar` FROM `user` WHERE `user`.`username` = `comment`.`iduser`)"
                ),
                "avatar",
              ],
          ],
          exclude: ["iduser","parent"],
        },
        order: [
          ['createdat', 'DESC'],['updatedat', 'DESC'],
        ],
        where: {
          idbook: id,
        },
        raw: true,
      });
      data = {
        ...type.SUCCESS,
        data: result,
      };
    } else {
      data = {
        ...type.NOT_FOUND,
      };
    }
    res.json(data);
  },
  create: async (req, res, next) => {
    let me = req.user;
    let { idbook, content } = req.body;
    if (me != null) {
        let book = await models.book.findOne({
            where: {
                idbook: idbook,
            },
        });
        if(book != null){
        let username = me.username;
        let data = {
          iduser: username,
          idbook,
          content: content,
        };
        let comment = await models.comment.create(data);
          if (comment) {
            comment.name = me.name;
            comment.avatar = me.avatar;
            result = {
              ...type.SUCCESS,
              data: comment,
            };
          } else {
            result = {
              ...type.BAD_REQUEST,
            };
          }
        } else {
            result = {
                ...type.NOT_FOUND,
              };
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