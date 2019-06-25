const router = require("koa-router")();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/getUploadURL', file_mgmt.getUploadURL);

module.exports = router;