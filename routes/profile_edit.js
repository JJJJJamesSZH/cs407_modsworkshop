const router = require('koa-router')();
const profile_mgmt = require("../application/profiles/profile_management");

router.post('/modsworkshop/profile/editAll', profile_mgmt.editProfile);

module.exports = router;