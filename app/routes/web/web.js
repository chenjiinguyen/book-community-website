var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page.index', { title: 'Express' });
});

router.get('/truyentranh', function(req, res, next) {
  res.render('page.truyentranh', { title: 'Express' });
});

module.exports = router;


module.exports = router;
