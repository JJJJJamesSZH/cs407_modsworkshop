const Controller = require("../controller/accountController");

exports.register = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.register(body);
    ctx.body = result;

    console.log("account_management.result: ", result);

    await next();
}

exports.emailVeri = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.emailVeri(body);
    ctx.body = result;

    console.log("account_management.result: ", result);

    await next();
}

exports.codeVeri = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.codeVeri(body);
    ctx.body = result;

    console.log("account_management.result: ", result);

    await next();
}