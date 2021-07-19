var express = require("express");
var router = express.Router();
const passport = require("../app/config/passport");

const user = require("../app/controller/api/user");
const book = require("../app/controller/api/book");
const auth = require("../app/controller/api/auth");
const episode = require("../app/controller/api/episode");
const point = require("../app/controller/api/point");
const comment = require("../app/controller/api/comment");

// User
router.get("/user", user.index);

// Book
router.get("/book", book.index);
router.get("/user/:username/book", book.getUserBook);
router.get("/book/search", book.search);
router.get("/book/category/:category", book.getCategory);
router.post("/book", passport.authenticateJWT, book.create);
router.put("/book", passport.authenticateJWT, book.update);
router.delete("/book", passport.authenticateJWT, book.delete);

//Episode
router.get("/episode/:episodeId", episode.index);
router.post("/book/:bookId/episode", passport.authenticateJWT, episode.create);
router.put("/episode/:episodeId", passport.authenticateJWT, episode.update);
router.delete("/episode/:episodeId", passport.authenticateJWT, episode.delete);
router.get("/book/:bookId/episode", episode.inBook);

// My Post
router.get("/me", passport.authenticateJWT, user.me);
router.get("/me/book", passport.authenticateJWT, book.getMyBook);

// Auth
router.post("/signin", auth.signin);
router.post("/signup", auth.signup);

// Point
router.get("/point/username/:username", point.index);
router.get("/me/point", passport.authenticateJWT, point.mePoint);
router.post("/me/point/create", passport.authenticateJWT, point.addPoint);

// Comment
router.get("/book/:id/comment", comment.index);
router.post("/comment", passport.authenticateJWT,comment.create);

module.exports = router;
