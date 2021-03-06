const router = require("koa-router")();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/overwriteUpload', file_mgmt.overwriteUpload);
router.post('/modsworkshop/file/editFile', file_mgmt.editFile);

module.exports = router;