const passport = require("../config/passport");
module.exports = {
    dashboard : async (req,res,next) => {
        if (!req.isAuthenticated()) {
            req.flash("Bạn chưa đăng nhập");
            res.redirect("/auth");
          } else {
            let role = req.user.roles.find(o => o.idrole === 'DIEUKHIEN');
            if(!role)
            {
                req.flash("Bạn không có quyền truy cập vào đây");
                res.redirect("/auth");
            }else{
              next();
            }
          }
    },
    moderation : async (req,res,next) => {
        if (!req.isAuthenticated()) {
            req.flash("Bạn chưa đăng nhập");
            res.redirect("/auth");
          } else {
            let role = req.user.roles.find(o => o.idrole === 'DIEUKHIEN');
            if(!role)
            {
                req.flash("Bạn không có quyền truy cập vào bảng điều khiển");
                res.redirect("/auth");
            }else{
                let role = req.user.roles.find(o => o.idrole === 'KIEMDUYET');
                if(!role)
                {
                  req.flash("Bạn không có quyền truy cập vào đây");
                  res.redirect("/auth");
                }else{
                  next();
                }
            }
            
          }
    }
}