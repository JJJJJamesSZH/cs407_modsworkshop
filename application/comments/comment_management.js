const Controller = require("../controller/commentController");
const jwtChecker = require("../authentication/checkJWT");

exports.addComment = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    } else {
        let controller = new Controller();
        let result = await controller.addComment(body);

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