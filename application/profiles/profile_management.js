const Controller = require("../controller/profileController");

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

exports.editProfile = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.editProfile(body);
    ctx.body = result;

    console.log("profile_management.result: ", result);

    await next();
}
