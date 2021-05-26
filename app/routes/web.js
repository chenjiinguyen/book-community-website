var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  const data = [
    {
      name: "Quỳnh",
      age: 18,
    },
    {
      name: "Xuân",
      age: 21,
    },{
      name: "Sơn",
      age: 21,
    }
  ];
  res.render("page.index", { data });
});

module.exports = router;
