import { files } from "./entity/files";
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');
AWS.config.update({
    region: s3_config.region
});

exports.listFiles = async function(content) {

}

exports.addFile = async function(content) {

}

exports.deleteFile = async function(content) {

}

exports.editFile = async function(content) {

}