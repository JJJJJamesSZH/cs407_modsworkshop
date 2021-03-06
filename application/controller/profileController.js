const baseController = require("./baseController");
const userProfile = require("../model/user_profile");
const comment_list = require("../model/comment_list");

class profileController extends baseController {
    async getProfile(content) {

        console.log("profileController.getProfile: ", content);

        let profile = await userProfile.getProfile(content);
        let comments = await comment_list.get_comment_byuser(content);

        let username = profile.username;
        let email = profile.email;
        let description = profile.description;
        let icon = profile.icon;
        let filesString = profile.uploadfile;
        let filesJSON = JSON.parse(filesString);
        let files = filesJSON.content;
        let favoriteJSON = JSON.parse(profile.favoritefile);
        let favorite = favoriteJSON.content;
        
        // console.log("profile: ", profile);

        let result = {
            "status": 200,
            "username": username,
            "email": email,
            "description": description,
            "icon": icon,
            "files": files,
            "favorite": favorite,
            "comments": comments.content
        }
        return result
    }

    async getUsername(content) {
        console.log("profileController.getUsername: ", content);

        let username = await userProfile.getUsername(content);
        let result = {
            "status": 200,
            "username": username
        }
        return result
    }


    async getDescription(content) {
        console.log("profileController.getDescription: ", content);

        let description = await userProfile.getDescription(content);
        let result = {
            "status": 200,
            "description": description
        }
        return result
    }

    async getIcon(content) {
        console.log("profileController.getIcon: ", content);

        let icon = await userProfile.getIcon(content);
        let result = {
            "status": 200,
            "icon": icon
        }
        return result
    }

    async getUploadFile(content) {
        console.log("profileController.getUploadedFiles: ", content);

        let files = await userProfile.getUploadFile(content);
        let result = {
            "status": 200,
            "files": files
        }
        return result
    }

    async getComments(content) {
        console.log("profileController.getcommentlist: ", content);

        let comments = await comment_list.get_comment_byuser(content);
        let result = {
            "status": 200,
            "comments": comments.content
        }
        return result
    }

    async editProfile(content) {
        console.log("profileController.editProfile: ", content);

        let result_code = await userProfile.editProfile(content);

        if (result_code == 0) {
            let result = {
                "status": 200
            }
            return result
        }

        let result = {
            // username exists code! I don't know what I should put here
            "status": 201
        }
        return result

    }

    async editUsername(content) {
        console.log("profileController.editUsername: ", content);

        let result_code = await userProfile.editUsername(content);
        if (result_code == 0) {
            let result = {
                "status": 200
            }
            return result
        }
        
        let result = {
            // username exists code! I don't know what I should put here
            "status": 201
        }
        return result

    }

    async editIcon(content) {
        console.log("profileController.editIcon: ", content);

        await userProfile.editIcon(content);
        let result = {
            "status": 200
        }
        return result
    }

    async editDescription(content) {
        console.log("profileController.editDescription: ", content);

        await userProfile.editDescription(content);
        let result = {
            "status": 200
        }
        return result
    }

    async getfavoritefile(content) {
        console.log("profileController.getfavoritefile: ", content);

        let files = await userProfile.getfavoritefile(content);
        let result = {
            "status": 200,
            "files": files
        }
        return result
    }

    async getlikedcomment(content) {
        console.log("profileController.getlikedcomment: ", content);

        let commentsID = await userProfile.getlikedcomment(content);
        let result = {
            "status": 200,
            "commentsID": commentsID
        }
        return result
    }

    async getdislikedcomment(content) {
        console.log("profileController.getdislikedcomment: ", content);

        let commentsID = await userProfile.getdislikedcomment(content);
        let result = {
            "status": 200,
            "commentsID": commentsID
        }
        return result
    }

}

module.exports = profileController;