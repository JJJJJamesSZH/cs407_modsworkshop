const baseController = require("./baseController");
const files = require("../model/files");
const user_profile = require("../model/user_profile");

class fileController extends baseController {
    async listFiles(content) {
        console.log("list files");

        let file_list = await files.listFiles(content);

        let result = {
            "status": 200,
            "file_list": file_list
        }

        return result;

    }

    async getFileDetail(content) {
        console.log("get file detail");

        let file_info = await files.getFileDetail(content);

        return file_info;
    }

    async getUploadURL(content) {
        console.log("getUploadURL");

        let email = content.email;
        // let mod = content.mod;
        let filename = content.filename;
        let type = content.type;
        let anonymous = content.anonymous;
        if (anonymous === undefined || anonymous === null){
            annoymous = false; // set default value
        }

        console.log("========= fileController.getUploadURL =============");
        console.log("email: ", email);
        console.log("filename: ", filename);
        console.log("type: ", type);

        let infoUploadContent = {
            email: "Info|" + email,
            filename: filename,
            type: type,
            anonymous: anonymous
        }

        // 1.  alter the database tables
        // |
        //  -- 1.1  files table
        // |    |
        // |     -- 1.1.1  add new row into files table
        // |    |
        // |     -- 1.1.2  gather the file ID of the new uploaded file
        // |
        //  -- 1.2  user_profile table
        //      |
        //       -- 1.2.1  gather the "uploadfile" column
        //      |
        //       -- 1.2.2  insert the new fileID into it
        //      |
        //       -- 1.2.3  update the row with new value

        // 1.1
        let fileID = await files.insertTable(content);

        // 1.2
        // 1.2.1
        let uploadFileString = await user_profile.getUploadFile({ email: email });
        let uploadFileJSON = JSON.parse(uploadFileString);
        let uploadFile = uploadFileJSON.content;
        if (uploadFile.includes(fileID) === false) {
            if (fileID !== undefined && fileID !== null) {
                uploadFile.push(fileID); // check duplicates
            }
        } else {
            // should update file, but not for now
        }
        uploadFileJSON = { content: uploadFile };
        uploadFileString = JSON.stringify(uploadFileJSON);
        await user_profile.setUploadFile({
            email: email,
            uploadfile: uploadFileString
        });

        // 2. get the uploadURL and infoUploadURL
        let url = await files.getUploadURL(content);
        let infoURL = await files.getUploadURL(infoUploadContent);
        // console.log("presigned-upload-url: ", url);

        let result = {
            "status": 200,
            "uploadUrl": url,
            "infoUploadUrl": infoURL
        }

        return result;
    }
}

module.exports = fileController;