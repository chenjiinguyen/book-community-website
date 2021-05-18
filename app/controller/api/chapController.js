const Book = require("../../model/BookModel");
const Episode = require("../../model/episodeModel");

const Content = require("../../model/contentModel");

const type = require("../../../lib/type");

const controller = {
  index: async (req, res, next) => {
    let _book = req.query.book;
    let _episode = req.query.episode;
    let data = {};
    
    if (_book != null) {
      let book = await Book.findOne({ where: { idbook: _book } });
      let result = {};
      if (book != null) {
        let category = book.category;
        let options = {
            where: { category: category },
            attributes: { exclude: ["category","idcontent","idepisode","index"] },
            order: ['index'],
          }
        if (_episode != null) {
          let episode = await Episode.findOne({
            where: { idepisode: _episode },
            raw: true,
          });
          result = { ...episode };
          options.where.idepisode = _episode;
          let contents = await Content.findAll(options);
          result.contents = contents;

        } else {
            
          let episodes = await Episode.findAll({
            where: { idbook: _book },
            raw: true,
          });
          
          result = [...episodes];

          for (let index = 0; index < episodes.length; index++) {
            const ep = episodes[index];
            options.where.idepisode = ep.idepisode;
            let contents = await Content.findAll(options);
            result[index].contents = contents;
          }
          
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
};

module.exports = controller;
