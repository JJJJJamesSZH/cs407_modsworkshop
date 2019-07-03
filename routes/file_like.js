const router = require("koa-router")();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/likeFile', file_mgmt.likeFile);
//router.post('/modsworkshop/file/unlikeFile', file_mgmt.unlikeFile);

module.exports = router;