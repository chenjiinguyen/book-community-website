const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = require("passport-local").Strategy;
const models = require("../model/index");
const jwt_options = require("../../lib/utils").jwt_options;
const type = require("../../lib/type");

var jwtLogin = new JwtStrategy(jwt_options, async function (jwt_payload, done) {
  const current_time = Date.now();
  const second_div = jwt_payload.exp - jwt_payload.iat;
  const back_time = jwt_payload.iat + second_div * 1000;
  if (current_time <= back_time) {
    const user = await models.user.findOne({
      where: { username: jwt_payload.username },
    });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    done(null, false);
  }
});

const localLogin = new LocalStrategy(function (username, password, done) {
  models.user
    .findOne({
      where: {
        [models.Sequelize.Op.or]: [{ username: username }, { email: username }],
      },
    })
    .then(async function (users) {
      if (!users) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (! await users.isValidPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, users);
    })
    .catch((err) => done(err));
});

passport.serializeUser(function (me, done) {
  return done(null, me.username);
});

passport.deserializeUser(function (id, done) {
  models.user.findOne({
    attributes: {
      include:[
          [models.sequelize.literal('(SELECT COUNT(`book`.`idbook`) FROM `book` WHERE `book`.`uploader` = `user`.`username` AND (`book`.`status` = 3))'), 'count_book'],
          [models.sequelize.literal('(SELECT `name` FROM `usergroup` WHERE `usergroup`.`idgroup` = `user`.`usergroup`)'), 'group_name'],
      ]
    },
    where: {username: id},
    raw: true,
  }).then(async (me) => {
    me.roles = await models.role.findAll({ 
      attributes: ['idrole','name'],
      include: [{
        attributes: [],
        model: models.usergroup_role,
        required: true,
        where: {
          idgroup : me.usergroup,
        },
       }],
       
      raw : true,
    })
    // console.log(me)
    return done(null, me);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);

module.exports = {
  p : passport,
  session: () => passport.session(),
  initialize: () => passport.initialize(),
  authenticateJWT: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, token) => {
      if (error || !token) {
        response
          .status(type.UNAUTHORIZED.status)
          .json({ ...type.UNAUTHORIZED });
      } else {
        request.user = token;
        next();
      }
    })(req, res, next);
  },
  authenticateLocal: () =>
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth",
      failureFlash: 'Sai email hoặc mật khẩu',
    }),
  authLocalMiddleware: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/auth");
    } else {
      next();
    }
  },dashboardMiddleware: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/auth");
    } else {
      let role = req.user.roles.find(o => o.idrole === 'DIEUKHIEN');
      if(!role)
      {
        res.redirect("/auth");
      }else{
        next();
      }
    }
  },
};
