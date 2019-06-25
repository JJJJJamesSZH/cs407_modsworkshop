const baseController = require("./baseController");
const files = require("../model/files");

class fileController extends baseController {
    async listFiles(content) {
        console.log("list files");

        let file_list = await files.listFiles(content);
        console.log("file_list: ", file_list);

        let result = {
            "status": 200,
            "file_list": file_list
        }

        return result;

    }

    async getUploadURL(content) {
        console.log("getUploadURL");

        let url = await files.getUploadURL(content);
        console.log("presigned-url: ", url);

        let result = {
            "status": 200,
            "url": url
        }

        return result;
    }

    async uploadComplete(content) {

    }
}

module.exports = fileController;