const router = require('koa-router')();
const file_mgmt = require("../application/files/file_management");

router.post('/modsworkshop/file/listAll', file_mgmt.listFiles);

module.exports = router;