const router = require('koa-router')();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/listUploaded', file_mgmt.listUploaded);
router.post('/modsworkshop/file/addUploadFile', file_mgmt.addUploaded);
router.post('/modsworkshop/file/deleteUploadFile', file_mgmt.deleteUploaded);

module.exports = router;