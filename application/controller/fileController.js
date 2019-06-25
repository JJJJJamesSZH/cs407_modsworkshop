const baseController = require("./baseController");
const files = require("../model/files");

class fileController extends baseController {
    async listFiles(content) {

        console.log("list files");
        let file_list = files.listFiles(content);

        let result = {
            "status": 200,
            "file_list": file_list
        }

        return result;

    }

    async addFile(content) {
        console.log("add files");
    }
}

module.exports = fileController;