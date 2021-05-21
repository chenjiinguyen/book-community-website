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
module.exports = router;