const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");

const controller = {
    create: async (req, res) => {
        let { token } = req.body;
        let result = {};
        if (token != null) {
            let dev = await models.device.findOne({
            where: {token :token}});
            if(dev == null){
                device = await models.device.create({
                    token: token,
                });
                if(device){
                    result = {
                        token,
                    };
                }else{
                    result = {
                        token: null,
                    }
                }
            }else{
                result = {
                    token: dev.token,
                }
            }

            
            
        }else{
            result = {
                token: null,
            }
        };
        res.json(result);
    }
}

module.exports = controller;