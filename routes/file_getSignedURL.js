const router = require("koa-router")();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/overwriteUpload', file_mgmt.overwriteUpload);
router.post('/modsworkshop/file/getUploadURL', file_mgmt.getUploadURL);
router.post('/modsworkshop/file/getDownloadURL', file_mgmt.getDownloadURL);
router.post('/modsworkshop/file/editFile', file_mgmt.editFile);
// router.post('/modsworkshop/file/deleteFile', file_mgmt.deleteFile);

module.exports = router;