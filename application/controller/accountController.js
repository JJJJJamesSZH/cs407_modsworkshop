const baseController = require("./baseController");

class accountController extends baseController {
    async register(content) {
        // 注册
        console.log("accountController: ", content);
        return 200;
    }
}

module.exports = accountController;