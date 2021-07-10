var express = require('express');
var router = express.Router();
const passport = require('../../app/config/passport');
const models = require('../../app/model/index');


const auth = require("../../app/controller/web/web/auth");
const home = require("../../app/controller/web/web/home");
const category = require("../../app/controller/web/web/category");
const book_detail = require("../../app/controller/web/web/book/detail");
const book_view = require("../../app/controller/web/web/book/view");

// Homepage
router.get('/',home);
router.get('/detail/:id',book_detail);
router.get('/watch/:bookId/:episodeId',book_view);

router.get('/category/:category',category);

router.get('/auth',auth.get_login);
router.get('/logout',auth.logout);
router.post('/login',passport.authenticateLocal());
router.post('/signup',auth.post_signup);

router.get('/login',async (req,res,next)=>{
  res.redirect("/auth?login")
});
router.get('/signup',async (req,res,next)=>{
  res.redirect("/auth?signup");
});
// router.get('/truyentranh', function(req, res, next) {
//   res.render('page.web.truyentranh', { title: 'Express' });
// });

router.get("/test",async (req,res,next)=>{
  let books = await models.book.findAll();
  for (const key in books) {
    const book = books[key];
    cleanText = book.description.replace(/(&lt;|<)br\s*\/?(&gt;|>)/g, "\n");
    cleanText = cleanText.replace(/<\/?[^>]+(>|$)/g, "");
    console.log(cleanText)
    book.description  = cleanText

    await book.save({silent: false})
  }
   

})

module.exports = router;