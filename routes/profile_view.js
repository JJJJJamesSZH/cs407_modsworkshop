const router = require('koa-router')();
const profile_mgmt = require("../application/profiles/profile_management");

router.post('/modsworkshop/profile/viewAll', profile_mgmt.getProfile);

module.exports = router;