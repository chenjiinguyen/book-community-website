const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");
const moment = require("moment");
const axios = require("axios");
const FormData = require('form-data');

const controller = {
  signin: async (req, res, next) => {
    const { username, password, remember } = req.body;
    if (username && password) {
      let user = await models.user.findOne({ where: { username: username } });
      if (!user) {
        res.json({
          status: 200,
          success: false,
          message: "Người dùng không tồn tại",
        });
      } else {
        if (await user.isValidPassword(password)) {
          // from now on we’ll identify the user by the id and the id is
          // the only personalized value that goes into our tokend

          const jwt = utils.issue_JWT(user, remember == "true" ? true : false);
          res.json({
            success: true,
            data: user,
            token: jwt.token,
            expiresIn: jwt.expiresIn,
          });
        } else {
          res.json({
            status: 200,
            success: false,
            message: "Mật khẩu không chính xác",
          });
        }
      }
    } else {
      res.json({
        status: 200,
        success: false,
        message: "Vui lòng nhập tất cả các trường",
      });
    }
  },
  signup: async (req, res, next) => {
    const attributes = [
      "username",
      "email",
      "password",
      "name",
      "gender",
      "birthday",
    ];
    const param = req.body;
    let result = {
      status: 200,
      success: false,
      message: "",
    };
    if (utils.check_properties_in_object(attributes, param)) {
      let data = await models.user.findOne({
        where: {
          username: param.username,
        },
      });
      if (data == null) {
        let data_email = await models.user.findOne({
          where: {
            email: param.email,
          },
        });
        if (data_email == null) {
          let user = await models.user.create({
            username: param.username,
            email: param.email,
            gender: param.gender,
            password: param.password,
            name: param.name,
            birthday: moment(param.birthday, ["DD-MM-YYYY", "DD/MM/YYYY"]),
            avatar: "https://ui-avatars.com/api/?size=256&name=" + param.name,
          });
          if (user) {
            result.success = true;
            result.data = user;
          } else {
            result.message = "Có lỗi trong quá trình đăng ký. Vui lòng thử lại";
          }
        } else {
          result.message = "Email đã tồn tại";
        }
      } else {
        result.message = "Tên người dùng đã tồn tại";
      }
    } else {
      result.message = "Vui lòng nhập tất cả các trường";
    }
    res.json(result);
  },
  updateName: async (req, res, next) => {
    let me = req.user;
    let result = {};
    let { name } = req.body;
    if (me != null) {
      me.name = name;
      me.save();
      result = {
        ...type.SUCCESS,
        data: me,
      };
    } else {
      result = {
        ...type.NOT_FOUND,
      };
    }

    return res.json(result);
  },
  updatePassword: async (req, res, next) => {
    let me = req.user;
    let result = {};
    let { password } = req.body;
    if (me != null) {
      data = await me.changePassword(password);
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
  updateAvatar: async (req, res, next) => {
    let url = "https://api.imgur.com/3/upload";
    let me = req.user;
    let result = {};
    try {
      if (!req.files) {
        result = {
          ...type.BAD_REQUEST,
        }
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;
        console.log(avatar);
        if (avatar.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
          let form_data = new FormData();
          form_data.append("image", avatar.data, avatar.name);
          const request_config = {
            method: "post",
            url: url,
            headers: {
                ...form_data.getHeaders(),
                "Authorization": "Client-ID f9568f6615eb164",
                "Content-Type": "multipart/form-data;"
            },
            data: form_data
          };
          let response = await axios(request_config);
          if(response.data.success){
            me.avatar = response.data.data.link;
            me.save();
            result = {
              ...type.SUCCESS,
              data: me,
            }
          }else{
            result = {
              ...type.BAD_REQUEST,
            }
          }
        } else {
          result = {
            ...type.BAD_REQUEST,
          }
        }
        
        
      }
    } catch (err) {
      result = {
        ...type.BAD_REQUEST,
      }
    };
    
    return res.json(result);
  },
  postLike: async (req, res, next) => {
    let me = req.user;
    let result = {};
    let { idbook } = req.body;
    if (me != null) {
      let username = me.username; 
      let input = {
        username,
        idbook,
      }
      let like = await models.like.create(input);
      if (like) {
        result = {
          ...type.SUCCESS,
        };
      }else{
        result = {
          ...type.BAD_REQUEST,
        }
      }
    } else {
      result = {
        ...type.BAD_REQUEST,
      };
    }

    return res.json(result);
  },
};

module.exports = controller;
