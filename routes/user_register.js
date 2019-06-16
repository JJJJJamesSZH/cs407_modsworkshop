const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/modsworkshop/account/registration', account_mgmt.register);

module.exports = router;