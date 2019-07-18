const Controller = require("../controller/profileController");
const jwtChecker = require("../authentication/checkJWT");

exports.getProfile = async(ctx, next) => {
    let body = ctx.request.body;
    
    let controller = new Controller();
    let result = await controller.getProfile(body);
    ctx.body = result;

    console.log("profile_management.result: ", result);

    await next();
}

exports.getUsername = async(ctx, next) => {
    let body = ctx.request.body;

        let controller = new Controller();
        let result = await controller.getUsername(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
}

exports.getDescription = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.getDescription(body);
    ctx.body = result;

    console.log("profile_management.result: ", result);

    await next();
}


exports.getIcon = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.getIcon(body);
    ctx.body = result;

    console.log("profile_management.result: ", result);

    await next();
    
}

exports.getUploadFile = async(ctx, next) => {
    let body = ctx.request.body;
    
    let controller = new Controller();
    let result = await controller.getUploadFile(body);
    ctx.body = result;

    console.log("profile_management.getUploadFile: ", result);

    await next();
    
}


exports.editProfile = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.editProfile(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}

exports.editIcon = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.editIcon(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}

exports.editDescription = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.editDescription(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}


exports.editUsername = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.editUsername(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}

exports.getfavoritefile = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.getfavoritefile(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}

exports.getlikedcomment = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.getlikedcomment(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}

exports.getdislikedcomment = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.getlikedcomment(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}


exports.getfavoritefile = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false){
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }
    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.getfavoritefile(body);
        ctx.body = result;

        console.log("profile_management.result: ", result);

        await next();
    }
}


