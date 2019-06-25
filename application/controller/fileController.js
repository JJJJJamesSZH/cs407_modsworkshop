const baseController = require("./baseController");
const files = require("../model/files");
const user_files = require("../model/user_file");

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

    async listUploaded(content) {
        console.log("Uploaded files");

        let uploaded_list = await user_files.getFiles(content);
        console.log("Uploaded_list: ", uploaded_list);

        let result = {
            "status": 200,
            "file_list": uploaded_list
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

    async addUploaded(content) {
        console.log("Uploaded files");

        let addFile = await user_files.userAddFile(content);
        console.log("addFile: ", addFile);

        if (addFile == 0){
            let result = {
                "status": 200,
            }
            return result;
        }
        let result = {
            "status": 500,
        }
        return result;
    }


    async deleteUploaded(content) {
        console.log("Uploaded files");

        let deleteFile = await user_files.userDeleteFile(content);
        console.log("deleteFile: ", deleteFile);

        if (deleteFile == 0){
            let result = {
                "status": 200,
            }
            return result;
        }
        let result = {
            "status": 500,
        }
        return result;

    }

}

module.exports = fileController;