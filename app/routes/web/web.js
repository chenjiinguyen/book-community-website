var express = require('express');
var router = express.Router();
const passport = require('../../app/config/passport');


const auth = require("../../app/controller/web/web/auth");
const home = require("../../app/controller/web/web/home");
const book_detail = require("../../app/controller/web/web/book/detail");
const book_view = require("../../app/controller/web/web/book/view");

// Homepage
router.get('/',home);
router.get('/detail/:id',book_detail);
router.get('/watch/:bookId/:episodeId',book_view);

router.get('/auth',auth.get_login);
router.get('/logout',auth.logout);
router.post('/login',passport.authenticateLocal());


router.get('/truyentranh', function(req, res, next) {
  res.render('page.web.truyentranh', { title: 'Express' });
});

module.exports = router;