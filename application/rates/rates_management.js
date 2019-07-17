const Controller = require("../controller/rateController");
const jwtChecker = require("../authentication/checkJWT");

exports.rateFile = async(ctx, next) => {
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
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.rateFile(body);
        ctx.body = result;

        await next();
    }
}