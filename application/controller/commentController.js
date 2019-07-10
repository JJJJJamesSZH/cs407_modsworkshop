const baseController = require("./baseCOntroller");
const comment_list = require("../model/files");
const user_profile = require("../model/user_profile");
const files = require("../model/files");

class commentController extends baseController {
    async addComment(content) {
        // need key and comment

        let key = content.key; // get the key from content
        let comment = content.comment;
        // 1. get file_id and email through key
        let file_info = await files.getFileDetail({ key: key });
        let file_id = file_info.fileID;
        let email = file_info.email;
        // 2. get profile through email
        let profile = await user_profile.getProfile({ email: email });
        // 3. get username through profile
        let username = profile.username;

        let comment_info = {
            file_id: file_id,
            email: email,
            username: username,
            comment: comment
        }

        let response = await comment_list.add_comment(comment_info);

        if (response === 0) {
            // success
            let result = {
                status: 200
            }
            return result;
        } else {
            // error occured
            let result = {
                status: 201,
                err_message: "Error message"
            }
            return result;
        }
    }
}

module.exports = commentController;