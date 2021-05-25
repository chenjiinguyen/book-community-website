var express = require('express');
var router = express.Router();
const passport = require('../app/config/passport');

const user = require('../app/controller/api/userController');
const book = require('../app/controller/api/bookController');
const auth = require('../app/controller/api/authController');
const episode = require('../app/controller/api/episodeController');

// User
router.get('/user',user.index);
router.get('/book', book.index);

// Book
router.get('/book/:bookId/episode',episode.index);
router.post('/book',passport.authenticateJWT,book.create);
router.put('/book', passport.authenticateJWT,book.update);
router.delete('/book', passport.authenticateJWT,book.delete);

//Episode
router.get('/episode/:episodeId',episode.index)
router.post('/book/:bookId/episode',passport.authenticateJWT,episode.create);
router.put('/episode/:episodeId',passport.authenticateJWT,episode.update);
router.delete('/episode/:episodeId',passport.authenticateJWT,episode.delete);

// My Post
router.get('/me/book',passport.authenticateJWT, book.getMyBook);

// Auth
router.post('/signin',auth.signin);
router.post('/signup',auth.signup);


module.exports = router;
