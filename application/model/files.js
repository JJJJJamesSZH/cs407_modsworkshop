import { files } from "./entity/files";
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');

const BucketName = "cs407projectjialu";

let params = {
    Bucket: BucketName
}

AWS.config.update({
    region: s3_config.region
});

let s3 = new AWS.S3({ apiVersion: s3_config.apiVersion });

exports.listFiles = async function(content) {
    return new Promise(function(resolve, reject) {

        // if (email === undefined) {
        //     // do nothing, list all files
        // } else {
        //     params["Prefix"] = content.email;
        //     console.log("prefix = ", content.email);
        // }
        // s3.listObjectsV2(params, function(err, data) {
        //     if (err) {
        //         // console.log(err, err.stack);
        //         reject(err.stack);
        //     } // an error occurred
        //     else {
        //         console.log(data);
        //         // return data.Contents;
        //         // data.Contents: array of files

        //         // filter data according to sortMethod, startRank and range

        //         resolve(data.Contents);
        //     } // successful response
        // });

        let sortMethod = content.sortMethod;
        let startRank = content.startRank;
        let range = content.range;
        let email = content.authorEmail;

        // where
        // order

        let whereValue = {};
        if (email === undefined || email === null) {
            whereValue = {};
        } else {
            whereValue = {
                email: email
            }
        }

        let orderValue = [];
        if (sortMethod === 'timeASC') {
            // time ascending
            orderValue.push(["dateUpdated", "ASC"]);
        } else if (sortMethod === 'timeDESC') {
            // time descending
            orderValue.push(["dateUpdated", "DESC"]);
        } else if (sortMethod === "nameASC") {
            // name ascending
            orderValue.push(["fileName", "ASC"]);
        } else if (sortMethod === "nameDESC") {
            // name descending
            orderValue.push(["fileName", "DESC"]);
        } else if (sortMethod === "downloadsASC") {
            // downloads ascending
            orderValue.push(["downloads", "ASC"]);
        } else if (sortMethod === "downloadsDESC") {
            // downloads descending
            orderValue.push(["downloads", "DESC"]);
        } else if (sortMethod === "likesASC") {
            // likes ascending
            orderValue.push(["likes", "ASC"]);
        } else if (sortMethod === "likesDESC") {
            // likes descending
            orderValue.push(["likes", "DESC"]);
        } else {
            // default - time descending - latest post first
            orderValue.push(["dateUpdated", "DESC"]);
        }

        let list = files.findAll({
            where: whereValue,
            order: orderValue
        })

        resolve(list);
    })
}

exports.getUploadURL = async function(content) {
    return new Promise(function(resolve, reject) {
        let email = content.email;
        // let mod = content.mod;
        let filename = content.filename;
        let key = email;
        // if ((mod !== undefined) && (mod != null)) {
        //     key = key + '|' + mod;
        // }
        key = key + '|' + filename;

        let params = {
            Bucket: BucketName,
            Key: key
        }
        s3.getSignedUrl('putObject', params, function(err, url) {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        })
    })
}
exports.getDownloadURL = async function(content) {


}

exports.addFile = async function(content) {
    console.log("upload file");


}

exports.deleteFile = async function(content) {

}

exports.editFile = async function(content) {
    // content:
    //      file, description, etc. 
    //      fileds could be null, only update those which are not null.
}