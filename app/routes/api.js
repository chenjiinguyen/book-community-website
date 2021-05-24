var express = require('express');
var router = express.Router();
const passport = require('../app/config/passport');

const user = require('../app/controller/api/userController');
const book = require('../app/controller/api/bookController');
const auth = require('../app/controller/api/authController');
const episode = require('../app/controller/api/episodeController');
/**
 * @swagger
 *    components:
 *      schemas:
 *        Book:
 *          type: object
 *          required:
 *            - title
 *            - author
 *            - finished
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the book.
 *            title:
 *              type: string
 *              description: The title of your book.
 *            author:
 *              type: string
 *              description: Who wrote the book?
 *            finished:
 *              type: boolean
 *              description: Have you finished reading it?
 *            createdAt:
 *              type: string
 *              format: date
 *              description: The date of the record creation.
 *          example:
 *             title: The Pragmatic Programmer
 *             author: Andy Hunt / Dave Thomas
 *             finished: true
 */ 
// User
/**
 * @swagger
 * /api/user:
 *    get:
 *      summary: Returns a user
 *      parameters:
 *        - name: username
 *          required: false
 *          description: Username of user
 *        - name: email
 *          required: false
 *          description: Email of user
 *      responses:
 *        200:
 *          description: Returns a user
 *        404:
 *          description: Not found
 */
router.get('/user',user.index);

// Book
/**
 * @swagger
 * /book:
 *   get:
 *     tags: [Books]
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/book', book.index);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/book/:bookId/episode',episode.index);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/book',passport.authenticateJWT,book.create);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.put('/book', passport.authenticateJWT,book.update);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete('/book', passport.authenticateJWT,book.delete);

//Episode

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/episode/:episodeId',episode.index)

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/book/:bookId/episode',passport.authenticateJWT,episode.create);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.put('/episode/:episodeId',passport.authenticateJWT,episode.update);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete('/episode/:episodeId',passport.authenticateJWT,episode.delete);

// My Post

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/me/book',passport.authenticateJWT, book.getMyBook);



// Auth

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/signin',auth.signin);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/signup',auth.signup);


module.exports = router;
