const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const models = require('../model/index');
const jwtOptions = require('../../lib/utils').jwtOptions;
const type = require('../../lib/type');

var jwtLogin = new JwtStrategy(jwtOptions, async function(jwt_payload, done) { 
    const current_time = Date.now();
    const second_div = jwt_payload.exp - jwt_payload.iat;
    const back_time = jwt_payload.iat + (second_div * 1000);
    if(current_time <= back_time){
      const user = await models.user.findOne({ where: { username: jwt_payload.username } });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }else{
      done(null, false);
    }
    
  });
  // use the strategy
passport.use(jwtLogin);

module.exports = {
    initialize : () => passport.initialize(),
    authenticateJWT:  (request, response, next) => {
      passport.authenticate('jwt', { session: false, }, async (error, token) => {
          if (error || !token) {
              response.status(type.UNAUTHORIZED.status).json({...type.UNAUTHORIZED});
          } else{
            request.user = token;
            next();
          }
          
      })(request, response, next);   
  },
}