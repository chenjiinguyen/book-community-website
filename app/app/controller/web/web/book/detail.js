const models = require("../../../../model/index");
const ultis = require("../../../../../lib/utils");
const data_controller = require("../../../../../lib/data_controller");
const status = require("../../../../../lib/status");
const moment = require("moment");

const controller = async (req, res, next) => {
    let data = await data_controller.default(req);
    data.title = "Trang chủ";
    let id = req.params.id;
    await ultis.update_view(id,true);
    data.book = await models.book.findOne({
        attributes: {
            include:[
                [models.sequelize.literal('(SELECT COUNT(`like`.`idbook`) FROM `like` WHERE `like`.`idbook` = `book`.`idbook`)'), 'like'],
                [models.sequelize.literal('(SELECT `name` FROM `category` WHERE `category`.`idcategory` = `book`.`category`)'), 'category_name'],
            ],
        },
        where: { idbook : id, status: status.ACCEPT},
        raw: true,
    });
    data.episodes = (await models.episode.findAll({
        where: { 
            idbook : id,
            status: status.ACCEPT 
        },
        attributes: ["idepisode","idbook", "name", "view", "updatedAt"],
        raw: true,
    })).map(x => {
        x.updatedAt = moment(x.updatedAt).format("DD-MM-YYYY");
        return x;
    })
    data.count_episodes = data.episodes.length;
    data.title = data.book.title;
    res.render("page.web.book.detail", data);
};

module.exports = controller;
