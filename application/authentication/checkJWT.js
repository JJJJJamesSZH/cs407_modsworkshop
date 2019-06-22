const jwt = require('jsonwebtoken');
let jwt_key = require("../../config/dev").keys['jwt'];

exports.decodeAuth = async function(ctx){
    let header = ctx.header['authorization'];
    let token = header
    try{
        let decoded = await jwt.verify(token, jwt_key);
    }
    catch(e){
        return false;
    }
    return true;
}