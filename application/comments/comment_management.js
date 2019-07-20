const Controller = require("../controller/commentController");
const jwtChecker = require("../authentication/checkJWT");

exports.addComment = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (body.admin && body.admin === true) {
        verified = body.email;
    }

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    } else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.addComment(body);

        ctx.body = result;

        await next();
    }
}

exports.deleteComment = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (body.admin && body.admin === true) {
        verified = body.email;
    }

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    } else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.deleteComment(body);

        ctx.body = result;

        await next();
    }
}


exports.showComment = async(ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.showComment(body);

    ctx.body = result;

    await next();
}



exports.likeComment = async(ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.likeComment(body);

    ctx.body = result;

    await next();
}

exports.unlikeComment = async(ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.unlikeComment(body);

    ctx.body = result;

    await next();
}

exports.dislikeComment = async(ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.dislikeComment(body);

    ctx.body = result;

    await next();
}

exports.undislikeComment = async(ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.undislikeComment(body);

    ctx.body = result;

    await next();
}