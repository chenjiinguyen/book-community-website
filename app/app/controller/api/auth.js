const models = require("../../model/index");
const type = require("../../../lib/type");
const utils = require("../../../lib/utils");
const moment = require("moment");

const controller = {
  signin: async (req, res, next) => {
    const { username, password, remember } = req.query;
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
    const param = req.query;
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
};

module.exports = controller;
