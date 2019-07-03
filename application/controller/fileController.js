const baseController = require("./baseController");
const files = require("../model/files");
const user_profile = require("../model/user_profile");

class fileController extends baseController {
    async listFiles(content) {
        console.log("list files");

        let file_list = await files.listFiles(content);

        // array of jsons
        // console.log("file_list: ", file_list); 

        let n = file_list.length;
        // console.log("size: ", n);

        let result_file_list = [];

        for (let i = 0; i < n; i++) {
            // add username in to file JSON
            // console.log("i = ", i);
            let fileJSON = file_list[i].dataValues;
            let username = await user_profile.getUsername({ email: fileJSON.email });
            // console.log("username: ", username);
            fileJSON["username"] = username;
            // console.log("fileJSON: ", fileJSON);

            // add Info download URL
            let infoDownloadURL = await files.getDownloadURL({ key: "Info|" + fileJSON.key });
            // console.log("downloadURL: ", downloadURL);
            fileJSON["infoDownloadUrl"] = infoDownloadURL;

            result_file_list.push(fileJSON);
        }

        let result = {
            "status": 200,
            "file_list": result_file_list
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
        if (anonymous === undefined || anonymous === null) {
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
            // should overwrite file, but not for now
            let result = {
                "status": 201,
                "message": "need overwrite"
            }
            return result;
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

    async overwriteUpload(content) {
        console.log("overwrite upload");

        let email = content.email;
        // let mod = content.mod;
        let filename = content.filename;
        let type = content.type;
        let anonymous = content.anonymous;
        if (anonymous === undefined || anonymous === null) {
            annoymous = false; // set default value
        }

        console.log("========= fileController.overwrite file =============");
        console.log("email: ", email);
        console.log("filename: ", filename);
        console.log("type: ", type);

        let infoUploadContent = {
            email: "Info|" + email,
            filename: filename,
            type: type,
            anonymous: anonymous
        }

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


    async getDownloadURL(content) {
        console.log("getDownloadURL");
        // make sure content has either key or both email and filename
        let key = content.key;
        let email = content.email;
        let filename = content.filename;

        if (key || (email && filename)) {
            let result = files.getDownloadURL(content);
            return result;
        } else {
            // cannot get key
            let result = {
                "status": 204,
                "err_message": "cannot get file key"
            }
            return result;
        }
    }
}

module.exports = fileController;