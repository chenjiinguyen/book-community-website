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
const role_middleware = require("../../app/middleware/role")
const dashboard = require("../../app/controller/web/admin/dashboard")
const book = require("../../app/controller/web/admin/book")
const episode = require("../../app/controller/web/admin/episode")
const censor = require("../../app/controller/web/admin/censor")

router.get('/',role_middleware.dashboard,dashboard);

router.get('/book/create', role_middleware.dashboard,book.create.get);
router.post('/book/create', role_middleware.dashboard,book.create.post);
router.get('/book/:id/edit',role_middleware.dashboard,book.edit.get);
router.post('/book/:id/edit',role_middleware.dashboard,book.edit.post);
router.get('/book/:id/detail',role_middleware.dashboard,book.detail.get);
router.get('/book/:id/success',role_middleware.dashboard,book.success.get);
router.get('/book/:id/delete', role_middleware.dashboard,book.delete.book);

router.get('/book/:id/create', role_middleware.dashboard,episode.create.get);
router.post('/book/:id/create', role_middleware.dashboard,episode.create.post);
router.get('/episode/:id/edit', role_middleware.dashboard,episode.edit.get);
router.post('/episode/:id/edit', role_middleware.dashboard,episode.edit.post);
router.get('/episode/:id/delete', role_middleware.dashboard,book.delete.episode);

router.get('/censor/',role_middleware.moderation,censor.all.get);
router.get('/censor/book/:id',role_middleware.moderation,censor.detail.get);
router.get('/censor/book/:id/verify',role_middleware.moderation,censor.book.get);
router.post('/censor/book/:id/verify',role_middleware.moderation,censor.book.post);
router.get('/censor/episode/:id/verify',role_middleware.moderation,censor.episode.get);
router.post('/censor/episode/:id/verify',role_middleware.moderation,censor.episode.post);
// router.get('/test', function(req, res, next) {
//     res.render('page.admin.episode.image.create', { title: 'Express', breadcrumb: breadcrumb });
// });

// router.get('/test2', function(req, res, next) {
//     res.render('page.admin.episode.audio.create', { title: 'Express', breadcrumb: breadcrumb });
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