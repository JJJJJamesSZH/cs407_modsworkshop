const Controller = require("../controller/fileController");
const jwtChecker = require("../authentication/checkJWT");

const admin = "admin@modsworkshop.com"
exports.listFiles = async (ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.listFiles(body);
    ctx.body = result;

    await next();
}

exports.getUploadURL = async (ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    // if (body.admin && body.admin === true) {
    //      verified = body.email;
    // }

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();
    }

    if (verified === admin) {
        let result = {
            "status": 501,
            "err_message": "Administrator cannot post"
        }
        console.log("Admin tried to post... ");
        ctx.body = result;
        await next();
    }

    else {
        body["email"] = verified;
        let controller = new Controller();
        let result = await controller.getUploadURL(body);
        ctx.body = result;

        await next();
    }
}

exports.overwriteUpload = async (ctx, next) => {
    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    // if (body.admin && body.admin === true) {
    //     verified = body.email;
    // }

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
        let result = await controller.overwriteUpload(body);
        ctx.body = result;

        await next();
    }
}

exports.getDownloadURL = async (ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.getDownloadURL(body);
    ctx.body = result;

    await next();
}

exports.listUploaded = async (ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.listUploaded(body);
    ctx.body = result;

    await next();
}

exports.addUploaded = async (ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    // if (body.admin && body.admin === true) {
    //     verified = true;
    // }

    let controller = new Controller();
    let result = await controller.addUploaded(body);
    ctx.body = result;

    await next();
}
exports.deleteUploaded = async (ctx, next) => {
    let body = ctx.request.body;
    let controller = new Controller();
    let result = await controller.deleteUploaded(body);
    ctx.body = result;

    await next();
}

exports.fileDetail = async (ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.getFileDetail(body);
    ctx.body = result;

    await next();
}

exports.editFile = async (ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.editFile(body);
    ctx.body = result;

    await next();
}

exports.deleteFile = async (ctx, next) => {

    let body = ctx.request.body;
    let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    // if (body.admin && body.admin === true) {
    //     verified = body.email;
    // }

    if (verified === false) {
        let result = {
            "status": 500,
            "err_message": "authorization code invalid"
        }
        console.log("authorization code invalid");
        ctx.body = result;
        await next();

    } else {
        if (verified != admin) {
            body["email"] = verified;
        }

        let controller = new Controller();
        let result = await controller.deleteFile(body);
        ctx.body = result;
        await next();
    }

}

exports.likeFile = async (ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.likeFile(body);
    ctx.body = result;

    await next();
}

exports.unlikeFile = async (ctx, next) => {
    let body = ctx.request.body;
    // let verified = await jwtChecker.decodeAuth(ctx);
    // let verified = true;

    let controller = new Controller();
    let result = await controller.unlikeFile(body);
    ctx.body = result;

    await next();
}

