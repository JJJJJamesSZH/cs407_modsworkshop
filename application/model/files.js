import { files } from "./entity/files";
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');
AWS.config.update({
    region: s3_config.region
});
let s3 = new AWS.S3({apiVersion:s3_config.apiVersion});

exports.listFiles = async function(content) {
    let list = await s3.listBuckets(function(err, data){
        if (err){
            console.log("Error: ", err);
        } else {
            console.log("Success: ", data.Buckets);
            return data.Buckets;
        }
    });
    console.log("list: ", list);
}

exports.addFile = async function(content) {

}

exports.deleteFile = async function(content) {

}

exports.editFile = async function(content) {

}