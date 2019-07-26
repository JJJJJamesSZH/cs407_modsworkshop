const router = require("koa-router")();
const report_mgmt = require("../application/report/report_management");

router.post('/modsworkshop/file/report', report_mgmt.send_report);

module.exports = router;