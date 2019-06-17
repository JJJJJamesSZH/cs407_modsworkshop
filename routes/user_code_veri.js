const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/modsworkshop/account/codeVeri', account_mgmt.codeVeri);

module.exports = router;