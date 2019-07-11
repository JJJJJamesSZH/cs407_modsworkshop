import { files } from "./entity/files";
import { user_profile } from "./entity/user_profile";
import { comment_list } from "./entity/comment_list";
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');

let Sequelize = require("sequelize");
let Op = Sequelize.Op;

let s3 = new AWS.S3({ apiVersion: s3_config.apiVersion });

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