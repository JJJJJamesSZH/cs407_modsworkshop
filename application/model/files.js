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
    if (content.email === undefined) {
        // do nothing, list all files
    } else {
        params["Prefix"] = content.email;
        console.log("prefix = ", content.email);
    }
    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } // an error occurred
        else {
            console.log(data);
        } // successful response
    });
}

exports.addFile = async function(content) {

}

exports.deleteFile = async function(content) {

}

exports.editFile = async function(content) {

}