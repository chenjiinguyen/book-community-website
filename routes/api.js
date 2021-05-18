var express = require('express');
var router = express.Router();
const passport = require('../app/config/passport');

const user = require('../app/controller/api/userController');
const book = require('../app/controller/api/bookController');
const auth = require('../app/controller/api/authController');
const chap = require('../app/controller/api/chapController');

// User
router.get('/user',user.index);

// Book
router.get('/book', book.index);
router.post('/book',passport.authenticateJWT,book.create);
router.put('/book', passport.authenticateJWT,book.update);
router.delete('/book', passport.authenticateJWT,book.delete);

// My Post
router.get('/book/me',passport.authenticateJWT, book.getMyBook);

// Book
router.get('/chap', chap.index);


// Auth
router.post('/signin',auth.signin);
router.post('/signup',auth.signup);


module.exports = router;
