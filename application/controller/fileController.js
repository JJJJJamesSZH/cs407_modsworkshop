const baseController = require("./baseController");
const files = require("../model/files");

class fileController extends baseController {
    async listFiles(content){

        console.log("list files");
        files.listFiles(content);

        let result = {
            "status": 200
        }

        return result;

    }
}

module.exports = fileController;