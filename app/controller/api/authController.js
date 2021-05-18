const User = require("../../model/userModel");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");

const controller = {
  signin: async (req, res, next) => {
    const { username, password, remember} = req.query;
    if (username && password) {
      let user = await User.findOne({ where: { username: username } });
      if (!user) {
        res.json({ 
            success: false,
            message: "No such user found"});
      }
      if (user.isValidPassword(password)) {
        // from now on we’ll identify the user by the id and the id is
        // the only personalized value that goes into our token
        const jwt = utils.issueJWT(user,(remember)?true:false);
        res.json({ 
            success: true,
            user: user, 
            token: jwt.token, 
            expiresIn: jwt.expiresIn 
        });
      } else {
        res.json({ 
            success: false,
            message: "Password is incorrect"
         });
      }
    } else {
      res.json({
        success: false,
        message: "Please enter all fields"
       });
    }
  },
  signup: async (req, res, next) => {
    const attributes = ["username","email","password","name","gender","birthday"];
    const param = req.body;
    if(utils.checkPropertiesInObject(attributes,param)){
      let data = await User.findOne({
        where: {
          username : param.username,
        }
      })
      if(data == null){
        let user = await User.create({
          username : param.username,
          email : param.email,
          gender: param.gender,
          password : param.password,
          name : param.name,
          birthday : new Date(param.birthday),
          avatar : "https://ui-avatars.com/api/?size=256&name="+param.name,
        });
        if(user){
          res.json({ 
            success: true,
            user: user,
         });
        }else{
          res.json({ 
            success: false,
            message: "Found a user with the same username"
         });
        }
      }else{
        res.json({ 
          success: false,
          message: "Found a user with the same username"
       });
      }
      

    }else{
      res.json({
        success: false,
        message: "Please enter all fields"
       });
    }
  }
};

module.exports = controller;
