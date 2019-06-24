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