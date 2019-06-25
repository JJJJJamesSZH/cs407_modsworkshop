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
        if (content.email === undefined) {
            // do nothing, list all files
        } else {
            params["Prefix"] = content.email;
            console.log("prefix = ", content.email);
        }
        s3.listObjectsV2(params, function(err, data) {
            if (err) {
                // console.log(err, err.stack);
                reject(err.stack);
            } // an error occurred
            else {
                console.log(data);
                // return data.Contents;
                // data.Contents: array of files
                resolve(data.Contents);
            } // successful response
        });
    })
}

exports.getUploadURL = async function(content) {
    return new Promise(function(resolve, reject) {
        let email = content.email;
        let mod = content.mod;
        let filename = content.filename;
        let key = email;
        if ((mod !== undefined) && (mod != null)) {
            key = key + '|' + mod;
        }
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