const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const issueJWT = (user,remember = false) => {
    let now = Date.now();
    console.log(new Date(now))
    let payload = { 
        username: user.username,
        iat: now,
     };
    let expiresIn = (remember)?"30d":"24h";
    let token = jwt.sign(payload, jwtOptions.secretOrKey,{expiresIn:expiresIn});

    return {
        token: "Bearer " + token,
        expiresIn: expiresIn,
    }
}

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SALT || 'bookcommunity',
}

const checkPropertiesInObject = (arrProperties, object) => {
    for (const key of arrProperties) {
        if(!object.hasOwnProperty(key)) return false;
    }
    return true;
}

  
module.exports.issueJWT = issueJWT;
module.exports.jwtOptions = jwtOptions;
module.exports.checkPropertiesInObject = checkPropertiesInObject;