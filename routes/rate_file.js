const router = require("koa-router")();
const rate_mgmt = require("../application/rates/rates_management");

router.post('/modsworkshop/rates/rateFile', rate_mgmt.rateFile);
router.post('/modsworkshop/rates/viewRate', rate_mgmt.viewRate);

module.exports = router;