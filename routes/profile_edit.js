const router = require('koa-router')();
const profile_mgmt = require("../application/profiles/profile_management");

router.post('/modsworkshop/profile/editAll', profile_mgmt.editProfile);
router.post('/modsworkshop/profile/editIcon', profile_mgmt.editIcon);
router.post('/modsworkshop/profile/editDescription', profile_mgmt.editDescription);
router.post('/modsworkshop/profile/editUsername', profile_mgmt.editUsername);

module.exports = router;