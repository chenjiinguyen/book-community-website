const models = require("../../../model/index");
const utils = require("../../../../lib/utils");
const moment = require("moment");


module.exports = {
    get_login : async (req, res, next) => {
        if(req.isAuthenticated())
            return res.back();
        let data = { };
        data.login = (req.query.signup == "")?false:true;
        if(req.session.signup)
        {
            data.signup = req.session.signup
            delete req.session.signup;
        }
            
        data.title = "Đăng nhập/Đăng ký"
        res.render("page.web.auth", data);
        
    },
    post_signup : async(req,res,next) =>{
        let data = req.body
        console.log(data)
        let require_fields = ["username","name","email","birthday","password"]
        if(utils.checkNotBlankInObject(require_fields, data)){

            let user = await models.user.findOne({
                where: {
                    username: data.username
                }
            })
            if(user){
                req.flash("error","Tên người dùng đã tồn tại")
                req.session.signup = data;
                res.redirect("/auth?signup");
            }else{
                data.birthday = moment(data.birthday)
                let new_user = await models.user.create({
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    birthday: data.birthday,
                    gender: data.gender,
                    password: data.password,
                    avatar: "https://ui-avatars.com/api/?size=256&name="+data.name,
                })
                if(new_user){
                    req.flash("success","Đăng ký thành công");
                    res.redirect("/auth?login");
                }else{
                    req.flash("error","Có lỗi phát sinh trong quá trình đăng ký")
                    req.session.signup = data;
                    res.redirect("/auth?signup");
                }
            }
        }else{
            req.flash("error","Vui lòng nhập đủ các trường")
            req.session.signup = data;
            res.redirect("/auth?signup");
        }
        
        
    },
    logout : async(req,res,next) => {
        req.logout()
        return res.back();
    }
};