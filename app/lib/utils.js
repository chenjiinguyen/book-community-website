const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const models = require("../app/model/index");

const issue_JWT = (user,remember = false) => {
    let now = Date.now();
    
    let payload = { 
        username: user.username,
        iat: now,
     };
    let expiresIn = (remember)?"30d":"24h";
    let token = jwt.sign(payload, jwt_options.secretOrKey,{expiresIn:expiresIn});

    return {
        token: "Bearer " + token,
        expiresIn: expiresIn,
    }
}

const jwt_options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SALT || 'bookcommunity',
}

const check_properties_in_object = (arrProperties, object) => {
    for (const key of arrProperties) {
        if(!object.hasOwnProperty(key)) return false;
    }
    return true;
}

const check_not_blank_in_object = (arrProperties, object) => {
    for (const key of arrProperties) {
        if(!object.hasOwnProperty(key))
            return false;
        if(object[key].length == 0) 
            return false;
        
    }
    return true;
}



const check_url_of_string = (str) => {
    let arr = split_content(str);
    let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|mp3)([/|.|\w|\s|-])*/;
    let check = arr.reduce((x,y) => {
        if(!y.match(regex)){
            return false;
        }
        return x;
    },true);
    return check;
}

const join_content = (arr) => {

}

const split_content = (str) => {
    return str.split("|");
}

const update_view = async (id, book = true) => {
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
    check_url_of_string,
    join_content,
    split_content,
    issue_JWT,
    jwt_options,
    check_properties_in_object,
    check_not_blank_in_object,
    update_view
};  
