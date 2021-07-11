const models = require("../../model/index");
const type = require('../../../lib/type');

const controller = {
    index: async function(req, res, next) {
        let email = req.query.email;
        let username = req.query.username;
        let data = {};
        let result = {};
        if(username!= null){
            result = await models.user.findOne({
                attributes: { exclude: ['password'] },
                where : {username : username}
            })
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result
            }
        }else if(email != null){
            result = await models.user.findOne({
                attributes: { exclude: ['password'] },
                where : {email : email}
            });
            if(result != null)
                code = type.SUCCESS;
            else
                code = type.NOT_FOUND;
            
            data = {
                ...code,
                data: result
            }
        }else{
            result = await models.user.findAll({
                attributes: { exclude: ['password'] },
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
    me : async function(req,res,next){
        let data = {};
        let result = {};
        let me = req.user;
        if(me != null){
            data = {
                ...type.SUCCESS,
                data: me,
            }
        }else{
            data = {
                ...type.NOT_FOUND,
            }
        }
        res.json(data);
    }
}

module.exports = controller;