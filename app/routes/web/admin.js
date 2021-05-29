var express = require('express');
var router = express.Router();

let breadcrumb = [{
        title: "Trang chu",
        link: "/admin/",
    },
    {
        title: "Admin",
        link: "/admin/",
    },
    {
        title: "Bang dieu khien",
        link: "",
    }
]
const passport = require("../../app/config/passport")
const dashboard = require("../../app/controller/web/admin/dashboard")
const book = require("../../app/controller/web/admin/book")
const episode = require("../../app/controller/web/admin/episode")

router.get('/',passport.dashboardMiddleware,dashboard);

router.get('/book/create', passport.dashboardMiddleware,book.create.get);
router.post('/book/create', passport.dashboardMiddleware,book.create.post);
router.get('/book/:id/edit',passport.dashboardMiddleware,book.edit.get);
router.get('/book/:id/detail',passport.dashboardMiddleware,book.detail.get);
router.get('/book/:id/success',passport.dashboardMiddleware,book.success.get);

router.get('/book/:id/create', passport.dashboardMiddleware,episode.create.get);
router.post('/book/:id/create', passport.dashboardMiddleware,episode.create.post);
router.get('/episode/:id/edit', passport.dashboardMiddleware,episode.edit.get);
router.post('/episode/:id/edit', passport.dashboardMiddleware,episode.edit.post);
// router.get('/novel/content', function(req, res, next) {
//     res.render('page.admin.book.content', { title: 'Express', breadcrumb: breadcrumb });
// });

// router.get('/novel/createChapter', function(req, res, next) {
//     res.render('page.admin.book.createChapter', { title: 'Express', breadcrumb: breadcrumb });
// });

router.get('/contract', function(req, res, next) {
    res.render('page.admin.contract', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/comment', function(req, res, next) {
    res.render('page.admin.comment', { title: 'Express', breadcrumb: breadcrumb });
});


module.exports = router;