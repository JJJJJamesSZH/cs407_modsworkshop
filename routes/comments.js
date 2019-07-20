const router = require("koa-router")();
const comment_mgmt = require("../application/comments/comment_management");

router.post('/modsworkshop/comment/addComment', comment_mgmt.addComment);
router.post('/modsworkshop/comment/showComment', comment_mgmt.showComment);
router.post('/modsworkshop/comment/deleteComment', comment_mgmt.deleteComment);

router.post('/modsworkshop/comment/likeComment', comment_mgmt.likeComment);
router.post('/modsworkshop/comment/unlikeComment', comment_mgmt.unlikeComment);

router.post('/modsworkshop/comment/dislikeComment', comment_mgmt.dislikeComment);
router.post('/modsworkshop/comment/undislikeComment', comment_mgmt.undislikeComment);

module.exports = router;