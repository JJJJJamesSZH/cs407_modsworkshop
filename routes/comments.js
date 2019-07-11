const router = require("koa-router")();
const comment_mgmt = require("../application/comments/comment_management");

router.post('/modsworkshop/comment/addComment', comment_mgmt.addComment);

module.exports = router;