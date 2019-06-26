const router = require('koa-router')();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/listAll', file_mgmt.listFiles);
router.post('/modsworkshop/file/fileDetail', file_mgmt.fileDetail);

module.exports = router;