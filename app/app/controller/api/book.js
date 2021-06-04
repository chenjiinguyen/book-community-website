const { Op,fn,col } = require("sequelize");
const { Sequelize } = require("sequelize");
const models = require("../../model/index");
const type = require('../../../lib/type');
const utils = require('../../../lib/utils');
const status = require('../../../lib/status');

const controller = {
    index: async (req, res, next) => {
        let id = req.query.id;
        let data = {};
        let result = {};
        if(id != null){
            result = await models.book.findOne({
                where : {
                    idbook : id,
                    status: {
                        [Op.or] : [status.CHECKED,status.DRAFT]
                    }
                },
                raw: true,
            })
            if(result != null){
                code = type.SUCCESS;
                await result.map(async (x) => {
                    x.like = await models.like.count({
                        where: {
                          id: x.idbook
                        }
                      });
                })
            }
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result
            }
        }else{
            result = await models.book.findAll({
                where: {
                    status: {
                        [Op.or] : [status.CHECKED,status.DRAFT]
                    }
                },
                raw: true,
            });
            if(result != null){
                code = type.SUCCESS;
                for (let i = 0; i < result.length; i++) {
                    result[i].like = await models.like.count({
                        where: {
                            idbook: result[i].idbook
                        }
                    });
                    
                }
            }
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result,
            }
        }
        res.json(data);
    },
    getChecked: async (req, res, next) => {
        let id = req.query.id;
        let data = {};
        let result = {};
        if(id != null){
            result = await models.book.findOne({
                where : {
                    idbook : id,
                    status: status.CHECKED
                }
            })
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result
            }
        }else{
            result = await models.book.findAll({
                where : {
                    status: status.CHECKED
                }
            });
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result,
            }
        }
        res.json(data);
    },
    getMyBook: async (req, res, next) => {
        let id = req.query.id;
        let data = {};
        let result = {};
        let author = req.user;
        if(id != null){
            result = await models.book.findOne({
                where : {
                    idbook : id,
                    status: {
                        [Op.or] : [status.CHECKED,status.DRAFT]
                    },
                    uploader: author.username
                }
            })
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result
            }
        }else{
            result = await models.book.findAll({
                where : {
                    status: {
                        [Op.or] : [status.CHECKED,status.DRAFT]
                    },
                    uploader: author.username
                }
            });
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result,
            }
        }
        res.json(data);
    },
    create: async (req, res, next) => {
        let data = {};
        let attributes = ["title","author","category","poster","description"];
        if(utils.check_properties_in_object(attributes,req.query)){
            let author = req.user;
            let param = req.query;
            let book = await models.book.create({
                title: param.title,
                author: param.author,
                uploader: author.username,
                category: param.category,
                poster : param.poster,
                description: param.description,
            });
            if(book != null){
                data = {
                    ...type.SUCCESS,
                    data: book
                }
            }else{
                data = {
                    ...type.BAD_REQUEST,
                    data: book
                }
            }
        }else{
            data = {
                ...type.BAD_REQUEST
            }
        }
        res.json(data);
    },
    update: async (req,res,next) => {
        let author = req.user;
        let attributes = ["title","author","category","poster","description","status"];
        if(utils.check_properties_in_object(["id"],req.query)){
            let param = req.query;
            let book = await models.book.findOne({
                where: {
                    idbook: param.id,
                    uploader: author.username,
                }
            });
            if(book != null){
                let count = 0;
                for (const key of attributes) {
                    if(key in param){
                        book[key] = param[key];
                        count++;
                    }
                }
                if(count > 0){
                    await book.save();
                    data = {
                        ...type.SUCCESS,
                        data: book
                    }
                }else{
                    data = {
                        ...type.BAD_REQUEST
                    }
                    data.message = "Nothing for Update"
                }
                
            }else{
                data = {
                    ...type.NOT_FOUND,
                }
            }
            
        }else{
            data = {
                ...type.BAD_REQUEST
            }
        }
        res.json(data);
    },
    delete: async (req,res,next) => {
        let author = req.user;
        let data = {}
        if(utils.check_properties_in_object(["id"],req.query)){
            let param = req.query;
            let book = await models.book.findOne({
                where: {
                    idbook: param.id,
                    uploader: author.username,
                    status: {
                        [Op.or] : [status.CHECKED,status.DRAFT]
                    },
                }
            });
            if(book != null){
                book.status = status.DELETED; 
                await book.save();
                data = {
                    ...type.SUCCESS,
                }
            }else{
                data = {
                    ...type.NOT_FOUND,
                }
            }
        }else{
            data = {
                ...type.BAD_REQUEST
            }
        }
        res.json(data);
    }
}



module.exports = controller;