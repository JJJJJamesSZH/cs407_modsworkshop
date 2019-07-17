import { user_rates } from './entity/user_rates';
import { user_profile_func } from './user_profile';
import { files_func } from './files';
let s3_config = require("../../config/dev").s3;
let AWS = require('aws-sdk');

let Sequelize = require("sequelize");
let Op = Sequelize.Op;

const BucketName = "cs407projectjialu";

let params = {
    Bucket: BucketName
}

AWS.config.update({
    region: s3_config.region
});

let s3 = new AWS.S3({ apiVersion: s3_config.apiVersion });

exports.checkRate = async function(content) {
    // check if the user have already rated the file
    // email, key

    let email = content.email;
    let file_id = content.file_id;

    let list = await user_rates.findAll({
        where: {
            email: email,
            file_id: file_id
        }
    })

    let n = list.length;
    return n > 0;
}

exports.rateFile = async function(content) {
    // create new rate log
    // email, filename, rate, (key)
    let email = content.email;
    let username = content.username;
    let file_id = content.file_id;
    let rate = content.rate;

    // console.log("email: ", email);
    // console.log("username: ", username);
    // console.log("file_id: ", file_id);
    // console.log("rate: ", rate);

    let data = {
        email: email,
        username: username,
        file_id: file_id,
        rate: rate
    }

    await user_rates.bulkCreate([data]);

    return 0;
}

exports.updateRate = async function(content) {
    // update the current rate from user
    let email = content.email;
    let username = content.username;
    let file_id = content.file_id;
    let rate = content.rate;

    let data = {
        email: email,
        username: username,
        file_id: file_id,
        rate: rate
    }

    await user_rates.update({
        data
    }, {
        where: {
            email: email,
            file_id: file_id
        }
    })

    return 0;
}

exports.calcRate = async function(content) {
    // console.log("====calcRate");
    // calculate the file overall rate
    let file_id = content.file_id;
    let list = await user_rates.findAll({
        where: {
            file_id: file_id
        }
    })

    let n = list.length; // number of rates been made
    let total_rate = 0;
    for (let i = 0; i < n; i++) {
        let current_rate = list[i].dataValues.rate;
        total_rate += current_rate;
    }

    return total_rate / n;
}