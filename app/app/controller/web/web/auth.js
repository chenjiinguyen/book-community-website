
module.exports = {
    get_login : async (req, res, next) => {
        if(req.isAuthenticated())
            return res.back();
        let data = { };
        data.title = "Đăng nhập/Đăng ký"
        res.render("page.web.auth", data);
        
    },
    logout : async(req,res,next) => {
        req.logout()
        return res.back();
    }
};