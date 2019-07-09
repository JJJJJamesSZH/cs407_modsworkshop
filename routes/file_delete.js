const router = require("koa-router")();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/deleteFile', file_mgmt.deleteFile);

module.exports = router;