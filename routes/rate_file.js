const router = require("koa-router")();
const rate_mgmt = require("../application/rates/rates_management");

router.post('/modsworkshop/rates/rateFile', rate_mgmt.rateFile);

module.exports = router;