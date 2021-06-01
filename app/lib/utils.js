const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const models = require("../app/model/index");

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

const checkNotBlankInObject = (arrProperties, object) => {
    for (const key of arrProperties) {
        if(!object.hasOwnProperty(key) || object[key].length == 0) return false;
    }
    return true;
}



const checkUrlOfString = (str) => {
    let arr = splitContent(str);
    let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|mp3)([/|.|\w|\s|-])*/;
    let check = arr.reduce((x,y) => {
        if(!y.match(regex)){
            return false;
        }
        return x;
    },true);
    return check;
}

const joinContent = (arr) => {

}

const splitContent = (str) => {
    return str.split("|");
}

const updateView = async (id, book = true) => {
    if(book){
        let x = await models.book.findOne({
            where: { idbook : id},
        });
        x.view += 1;
        await x.save({ silent: true });
    }else{
        let x = await models.episode.findOne({
            where: { idepisode : id},
        });
        x.view += 1;
        await x.save();
    }
}

module.exports = {
    checkUrlOfString,
    joinContent,
    splitContent,
    issueJWT,
    jwtOptions,
    checkPropertiesInObject,
    checkNotBlankInObject,
    updateView
};  
