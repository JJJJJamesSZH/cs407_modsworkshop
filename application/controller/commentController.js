const baseController = require("./baseController");
const comment_list = require("../model/comment_list");
const user_profile = require("../model/user_profile");
const files = require("../model/files");

class commentController extends baseController {
    async showComment(content) {
        // need file key

        let key = content.key;

        // get file_id through key;
        let file_info = await files.getFileDetail({ key: key });
        let file_id = await file_info.fileID;

        // get comments through file_id
        let comments = await comment_list.get_comment({ file_id: file_id });
        let result = {
            status: 200,
            comments: comments.content
        }
        return result;
    }

    async addComment(content) {
        // need key and comment

        let key = content.key; // get the key from content
        let comment = content.comment;
        // 1. get file_id and email through key
        let file_info = await files.getFileDetail({ key: key });
        let file_id = file_info.fileID;
        let email = content.email;
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

    async likeComment(content) {
        console.log("likecomment", content);
        // make sure content has either key or both email and filename
        let id = content.id;
        let email = content.email;

        if (id || email) {

            let favoritefileString = await user_profile.getlikedcomment(content);
            let favoritefileJSON = JSON.parse(favoritefileString);
            let favoritefile = favoritefileJSON.content;

            if (favoritefile.includes(id) === true) {
                let result = {
                    "status": 206,
                    "err_message": "Comment has been liked"
                }
                return result;
            }

            let favoritefileString2 = await user_profile.getdislikedcomment(content);
            let favoritefileJSON2 = JSON.parse(favoritefileString2);
            let favoritefile2 = favoritefileJSON2.content;

            if (favoritefile2.includes(id) === true) {
                let result = {
                    "status": 208,
                    "err_message": "Comment has been disliked"
                }
                return result;
            }


            favoritefile.push(id);

            favoritefileJSON = { content: favoritefile };
            favoritefileString = JSON.stringify(favoritefileJSON);
            console.log("String", favoritefileString);
            user_profile.setcommentlist(email, favoritefileString, 1);

            comment_list.likeComment(content);

            let result = {
                status: 200
            }

            return result;
        }

        let result = {
            "status": 204,
            "err_message": "cannot get comment key"
        }
        return result;

    }

    async unlikeComment(content) {
        console.log("unlikeComment", content);
        // make sure content has either key or both email and filename
        let id = content.id;
        let email = content.email;

        if (id || email) {

            let favoritefileString = await user_profile.getlikedcomment(content);

            let thelist = favoritefileString.split(/[^0-9]/).map(Number);
            thelist = thelist.filter(Boolean);

            if (thelist.includes(id) === false) {
                let result = {
                    "status": 207,
                    "err_message": "Comment has not been liked"
                }
                return result;
            }

            let favoritefileString2 = await user_profile.getlikedcomment(content);
            let favoritefileJSON2 = JSON.parse(favoritefileString2);
            let favoritefile2 = favoritefileJSON2.content;

            if (favoritefile2.includes(id) === true) {
                let result = {
                    "status": 208,
                    "err_message": "Comment has been liked"
                }
                return result;
            }

            let removed = thelist.indexOf(id);
            thelist.splice(removed, 1);
            console.log("Updated likedcomment list: ", thelist);

            let favoritefileJSON = { content: thelist };
            favoritefileString = JSON.stringify(favoritefileJSON);

            user_profile.setcommentlist(email, favoritefileString, 1);

            comment_list.unlikeComment(content);

            let result = {
                status: 200
            }

            return result;
        }

        let result = {
            "status": 204,
            "err_message": "cannot get file key"
        }
        return result;
    }


    async dislikeComment(content) {
        console.log("dislikecomment", content);
        // make sure content has either key or both email and filename
        let id = content.id;
        let email = content.email;

        if (id || email) {

            let favoritefileString = await user_profile.getdislikedcomment(content);
            let favoritefileJSON = JSON.parse(favoritefileString);
            let favoritefile = favoritefileJSON.content;

            if (favoritefile.includes(id) === true) {
                let result = {
                    "status": 206,
                    "err_message": "Comment has been disliked"
                }
                return result;
            }

            favoritefile.push(id);

            favoritefileJSON = { content: favoritefile };
            favoritefileString = JSON.stringify(favoritefileJSON);
            user_profile.setcommentlist(email, favoritefileString, 0);

            comment_list.dislikeComment(content);

            let result = {
                status: 200
            }

            return result;
        }

        let result = {
            "status": 204,
            "err_message": "cannot get comment id"
        }
        return result;

    }

    async undislikeComment(content) {
        console.log("unlikeComment", content);
        // make sure content has either key or both email and filename
        let id = content.id;
        let email = content.email;

        if (id || email) {

            let favoritefileString = await user_profile.getdislikedcomment(content);

            let thelist = favoritefileString.split(/[^0-9]/).map(Number);
            thelist = thelist.filter(Boolean);

            if (thelist.includes(id) === false) {
                let result = {
                    "status": 207,
                    "err_message": "Comment has not been disliked"
                }
                return result;
            }

            let removed = thelist.indexOf(id);
            thelist.splice(removed, 1);
            console.log("Updated dislikedcomment list: ", thelist);

            let favoritefileJSON = { content: thelist };
            favoritefileString = JSON.stringify(favoritefileJSON);

            user_profile.setcommentlist(email, favoritefileString, 0);

            comment_list.undislikeComment(content);

            let result = {
                status: 200
            }

            return result;
        }

        let result = {
            "status": 204,
            "err_message": "cannot get file id"
        }
        return result;
    }
}

module.exports = commentController;