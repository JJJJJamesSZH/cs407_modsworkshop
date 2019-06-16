// email verification

const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/modsworkshop/account/emailVeri', account_mgmt.emailVeri);

module.exports = router;