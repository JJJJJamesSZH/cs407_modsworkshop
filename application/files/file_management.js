const Controller = require("../controller/fileController");
const jwtChecker = require("../authentication/checkJWT");

exports.listFiles = async(ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.listFiles(body);
    ctx.body = result;

    await next();
}

exports.getUploadURL = async(ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    } else {
        ctx["email"] = verified;
        let controller = new Controller();
        let result = await controller.getUploadURL(body);
        ctx.body = result;

        await next();
    }
}
exports.listUploaded = async(ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.listUploaded(body);
    ctx.body = result;

    await next();
}
exports.addUploaded = async(ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.addUploaded(body);
    ctx.body = result;

    await next();
}
exports.deleteUploaded = async(ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.deleteUploaded(body);
    ctx.body = result;

    await next();
}