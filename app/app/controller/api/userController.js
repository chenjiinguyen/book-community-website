const User = require('../../model/userModel');
const type = require('../../../lib/type');

const controller = {
    index: async function(req, res, next) {
        let email = req.query.email;
        let username = req.query.username;
        let data = {};
        let result = {};
        if(username!= null){
            result = await User.findOne({
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
            result = await User.findOne({
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
            result = await User.findAll({
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
    create: async function(req,res,next){

    }
}

module.exports = controller;