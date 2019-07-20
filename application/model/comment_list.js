import { files } from "./entity/files";
import { user_profile } from "./entity/user_profile";
import { comment_list } from "./entity/comment_list";
const user_profile_m = require("../model/user_profile");
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');

let Sequelize = require("sequelize");
let Op = Sequelize.Op;

let s3 = new AWS.S3({ apiVersion: s3_config.apiVersion });

exports.get_comment = async function(content) {
    let file_id = content.file_id;
    let list = await comment_list.findAll({
        where: {
            file_id: file_id
        }
    })
    let n = list.length; // number of comments
    console.log("=======================");
    console.log("number of comments: ", n);
    // console.log("list: ", list);
    let result_content = [];
    for (let i = 0; i < n; i++) {
        let comment = list[i].dataValues;
        result_content.push(comment);
    }
    let result = {
        content: result_content
    }
    return result;
}

exports.get_comment_byuser = async function(content) {
    let email = content.email;
    let list = await comment_list.findAll({
        where: {
            email: email
        }
    })
    let n = list.length; // number of comments
    console.log("=======================");
    console.log("number of comments: ", n);
    // console.log("list: ", list);
    let result_content = [];
    for (let i = 0; i < n; i++) {
        let comment = list[i].dataValues;
        result_content.push(comment);
    }
    let result = {
        content: result_content
    }
    return result;
}

exports.add_comment = async function(content) {
    let file_id = content.file_id;
    let email = content.email;
    let username = content.username;
    let comment = content.comment;
    let like = 0;
    let dateCreated = "" + Date.now();
    let dateUpdated = dateCreated;

    let insert_content = {
        file_id: file_id,
        email: email,
        username: username,
        comment: comment,
        like: like,
        dateCreated: dateCreated,
        dateUpdated: dateUpdated
    }

    try {
        await comment_list.bulkCreate([
            insert_content
        ]);
        return 0; // success.
    } catch (e) {
        console.log(e);
        console.log("Error detected.");
        return 1; // for error detected
    }
}

exports.likeComment = async function(content) {
    console.log("like comment: ", content);

    // serach details of the file, by either key or email and filename
    let id = content.comment_id;

    console.log("addlike comment: ", id);

    let likecomment = await comment_list.findOne({
        where: {
            comment_id: id
        }
    });

    let like = likecomment.like;
    comment_list.update({ like: like + 1 }, { where: { comment_id: id } })

}

exports.unlikeComment = async function(content) {
    console.log("unlike comment: ", content);

    // serach details of the file, by either key or email and filename
    let comment_id = content.comment_id;

    let unlikefile = await comment_list.findOne({
        where: {
            comment_id: comment_id
        }
    });

    let like = unlikefile.like;
    comment_list.update({ like: like - 1 }, { where: { comment_id: comment_id } })

}


exports.dislikeComment = async function(content) {
    console.log("dislike comment: ", content);

    // serach details of the file, by either key or email and filename
    let id = content.comment_id;

    console.log("add dislike comment: ", id);

    let likecomment = await comment_list.findOne({
        where: {
            comment_id: id
        }
    });

    let dislike = likecomment.dislike;
    comment_list.update({ dislike: dislike + 1 }, { where: { comment_id: id } })

}


exports.undislikeComment = async function(content) {
    console.log("undislike comment: ", content);

    // serach details of the file, by either key or email and filename
    let comment_id = content.comment_id;

    let unlikefile = await comment_list.findOne({
        where: {
            comment_id: comment_id
        }
    });

    let dislike = unlikefile.dislike;
    comment_list.update({ dislike: dislike - 1 }, { where: { comment_id: comment_id } })

}


exports.deleteComment = async function(comment_id) {

    comment_list.destroy({
        where: {
            comment_id: comment_id
        }
    });

}


exports.deleteLikeDislike = async function(fileID) {

    const Op = Sequelize.Op;

    let favoriteuserlist = await user_profile.findAll({
        where: {
            likedcomment: {
                [Op.like]: '%' + fileID + "" + '%'
            }
        }
    });

    let disfavoriteuserlist = await user_profile.findAll({
        where: {
            dislikedcomment: {
                [Op.like]: '%' + fileID + "" + '%'
            }
        }
    });

    console.log("liked users: ", favoriteuserlist);
    console.log("disliked users: ", disfavoriteuserlist);

    var user;
    for (user of favoriteuserlist) {
        let favoritefileString = user.likedcomment;

        let thelist = favoritefileString.split(/[^0-9]/).map(Number);
        thelist = thelist.filter(Boolean);

        if (thelist.includes(fileID) === false) {
            // console.log("fileID not in favoritelist", user.userID);
            continue;
        }

        let removed = thelist.indexOf(fileID);
        thelist.splice(removed, 1);
        // console.log("Updated favorite list: ", thelist);

        let favoritefileJSON = { content: thelist };
        favoritefileString = JSON.stringify(favoritefileJSON);

        user_profile_m.setcommentlist(user.email, favoritefileString, 1);
    }

    for (user of disfavoriteuserlist) {
        let disfavoritefileString = user.dislikedcomment;

        let thelist = disfavoritefileString.split(/[^0-9]/).map(Number);
        thelist = thelist.filter(Boolean);

        if (thelist.includes(fileID) === false) {
            // console.log("fileID not in disfavoritelist", user.userID);
            continue;
        }

        let removed = thelist.indexOf(fileID);
        thelist.splice(removed, 1);
        // console.log("Updated favorite list: ", thelist);

        let disfavoritefileJSON = { content: thelist };
        disfavoritefileString = JSON.stringify(disfavoritefileJSON);

        user_profile_m.setcommentlist(user.email, disfavoritefileString, 0);
    }

    let result = {
        status: 200
    };

    return result;

}