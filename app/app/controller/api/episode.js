const { Op,fn,col } = require("sequelize");
const { Sequelize } = require("sequelize");
const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");
const status = require("../../../lib/status");

const controller = {
  index: async (req, res, next) => {
    let _book = req.params.bookId;
    let _episode = req.params.episodeId;
    let data = {};
    if (_book != null) {
      let book = await models.book.findOne({ where: { idbook: _book } });
      let result = {};
      if (book != null) {
        if (_episode != null) {
          let episode = await models.episode.findOne({
            where: {
              idepisode: _episode,
              status: status.CHECKED,
            },
            raw: true,
          });
          result = { ...episode };
          result.content =
            result.content == null || result.content.length == 0
              ? []
              : result.content.split("|");
        } else {
          let episodes = await models.episode.findAll({
            where: { idbook: _book, status: status.CHECKED },
            raw: true,
          });

          result = [...episodes];
          result.map((x) => {
            x.content =
              x.content == null || x.content.length == 0
                ? []
                : x.content.split("|");
            return x;
          });
        }
        data = {
          ...type.SUCCESS,
          data: result,
        };
        // console.log(result)
      } else {
        data = {
          ...type.NOT_FOUND,
        };
      }
    } else {
      data = {
        ...type.NOT_FOUND,
      };
    }

    res.json(data);
  },
  create: async (req, res, next) => {
    let data = {
      ...type.BAD_REQUEST,
    };
    let attributes = ["name", "content"];
    let author = req.user;
    let book = await models.book.findOne({ where: { idbook: req.params.bookId } });
    if (author.username == book.uploader) {
      if (utils.check_properties_in_object(attributes, req.query)) {
        let chapOfBook = await models.episode.findAll({
          where: { idbook: req.params.bookId },
          raw: true,
        });
        let param = req.query;
        let index = Math.max(...chapOfBook.map((x) => x.index))+1;
          let episode = await models.episode.create({
            idbook: req.params.bookId,
            index: index,
            name: param.name,
            content: param.content,
          });
          if (episode != null) {
            data = {
              ...type.SUCCESS,
              data: episode,
            };
          }
        
      }
    } else {
      data = {
        ...type.UNAUTHORIZED,
      };
    }
    res.json(data);
  },
  update: async (req, res, next) => {
    let data = {
      ...type.BAD_REQUEST,
    };
    let attributes = ["name", "content"];
    let author = req.user;
    let book = await models.book.findOne({ where: { idbook: req.params.bookId } });
    if (author.username == book.uploader) {
      if (utils.check_properties_in_object(attributes, req.query)) {
        let param = req.query;
        let episode = await models.episode.findOne({
          where: { idepisode: req.params.episodeId },
        });
        if (!episode) {
          let count = 0;
          for (const key in attributes) {
            if (key in param) {
              episode[key] = param[key];
              count++;
            }
          }

          if (count > 0) {
            await episode.save();
            data = {
              ...type.SUCCESS,
              data: episode,
            };
          } else {
            data = {
              ...type.BAD_REQUEST,
            };
            data.message = "Nothing for Update";
          }
        } else {
          data = {
            ...type.NOT_FOUND,
          };
        }
      }
    }else{
      data = {
        ...type.UNAUTHORIZED,
      };
    }
    res.json(data);
  },
  delete: async (req, res, next) => {
    let author = req.user;
    let data = {
      ...type.BAD_REQUEST,
    };
    let book = await models.book.findOne({ where: { idbook: req.params.bookId } });
    if (author.username == book.uploader) {
    let param = req.query;
    let episode = await models.episode.findOne({
      where: {
        idepisode: req.params.episodeId,
        status: {
          [Op.or]: [status.CHECKED, status.DRAFT],
        },
      },
    });
    if (episode != null) {
      episode.status = status.DELETED;
      episode.index = -1;
      await episode.save();
      data = {
        ...type.SUCCESS,
      };
    } else {
      data = {
        ...type.NOT_FOUND,
      };
    }
    }else{
      data = {
        ...type.UNAUTHORIZED,
      };
    }
    res.json(data);
  },
};

module.exports = controller;
