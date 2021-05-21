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

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('page.admin.dashboard', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/novel/create', function(req, res, next) {
    res.render('page.admin.novel.create', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/novel/content', function(req, res, next) {
    res.render('page.admin.novel.content', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/novel/createChapter', function(req, res, next) {
    res.render('page.admin.novel.createChapter', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/contract', function(req, res, next) {
    res.render('page.admin.contract', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/comment', function(req, res, next) {
    res.render('page.admin.comment', { title: 'Express', breadcrumb: breadcrumb });
});

router.get('/novel/submitWait', function(req, res, next) {
    res.render('page.admin.novel.submitWait', { title: 'Express', breadcrumb: breadcrumb });
});
module.exports = router;