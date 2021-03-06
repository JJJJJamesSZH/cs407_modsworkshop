import { files } from "./entity/files";
import { catchClause } from "babel-types";
import { user_profile } from "./entity/user_profile";
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

async function files_insert(insert_content) {
    console.log("================== files_insert");
    console.log("insert_content: ", insert_content);
    try {
        await files.bulkCreate([
            insert_content
        ])
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            console.log("duplicate key exists");
        }
    }
    console.log("================== files_insert complete");
}

exports.files_search = async function files_search(fileKey) {
    console.log("================== files_search");
    let file = await files.findOne({
        where: {
            key: fileKey
        }
    })
    console.log("file: ", file);
    console.log("fileID: ", file.dataValues.fileID);
    console.log("================== files_search complete");
    return file.dataValues.fileID;
}

exports.insertTable = async function(content) {
    // for uploading new file
    // takes: file info
    // returns: the fileID of the new uploaded file.
    // Problem: Async events
    let email = content.email;
    let username = content.username;
    let filename = content.filename;
    let type = content.type;
    let anonymous = content.anonymous;
    let d = new Date();
    let date = "" + d.getTime();
    let file_insert = {
        email: email,
        username: username,
        fileName: filename,
        type: type,
        key: email + "|" + filename,
        dateCreated: date,
        dateUpdated: date,
        downloadNum: 0,
        likes: 0,
        anonymous: anonymous
    }
    await files_insert(file_insert);

    console.log("date: ", date);
    // let list = await files.findAll({
    //     where: {
    //         key: content.email + "|" + content.filename
    //     }
    // })
    // let fileID = list[0].dataValues.fileID;
    let fileID = file_search(content.email + "|" + content.filename);
    console.log("==================");
    console.log("fileID: ", fileID);
    return fileID;
}

async function file_search(fileKey) {
    console.log("================== function file_search");
    let file = await files.findOne({
        where: {
            key: fileKey
        }
    })
    console.log("file: ", file);
    console.log("fileID: ", file.dataValues.fileID);
    console.log("================== function file_search complete");
    return file.dataValues.fileID;
}

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

        let searchKeyword = content.searchKeyword;
        let searchContributor = content.searchByContributor;
        let sortMethod = content.sortingMethod;
        let filterType = content.filterType;
        let filterTime = content.filterTime;
        let filterRateFrom = content.filterRateFrom;
        let filterRateTo = content.filterRateTo;

        // let startRank = content.startRank;
        // let range = content.range;
        let email = content.authorEmail;

        // search for specific user
        let whereValue = {};
        if (email === undefined || email === null) {
            // whereValue = {};
        } else {
            whereValue["email"] = email;
        }

        // search for keyword
        if (searchKeyword !== undefined && searchKeyword !== null) {
            searchKeyword = searchKeyword.toLowerCase();
            let keywordSearch = {
                [Op.like]: '%' + searchKeyword + '%'
            }
            if (searchContributor === false) {
                whereValue["filename"] = keywordSearch;
            } else {
                whereValue["username"] = keywordSearch;
            }
        }

        // check filterType (filter by type)
        if (filterType !== undefined && filterType !== null) {
            // let filterTypeJSON = JSON.parse(filterType);
            let filterTypeJSON = filterType;
            let filters = filterTypeJSON.content;
            let n = filters.length;
            if (n === 0) {
                // do nothing
            } else if (n === 1) {
                whereValue["type"] = filters[0];
            } else {
                let orValue = [];
                for (let i = 0; i < n; i++) {
                    let data = {
                        type: filters[i]
                    };
                    orValue.push(data);
                }
                whereValue[Op.or] = orValue;
            }
        }

        // check filterTime (user story 15, filter by time)
        if (filterTime !== undefined && filterTime !== null) {
            console.log("============= filtrTime =============");
            let timeOverride = 0;
            // one day
            if (filterTime === 'oneday') {
                console.log("----- oneday -----");
                timeOverride = 1000 * 60 * 60 * 24;
            } else if (filterTime === 'threemonths') {
                console.log("----- threemonths -----");
                timeOverride = 1000 * 60 * 60 * 24 * 30;
            } else if (filterTime === 'oneyear') {
                console.log("----- oneyear -----");
                timeOverride = 1000 * 60 * 60 * 24 * 365;
            }
            let timeCheck = Date.now() - timeOverride;
            // timeCheck = "" + timeCheck;
            console.log("timeCheck: ", timeCheck);
            whereValue["dateUpdated"] = {
                [Op.gte]: timeCheck
            }
        }

        // filter by rate
        if (filterRateFrom === undefined || filterRateFrom === null) {
            filterRateFrom = 0;
        }
        if (filterRateTo === undefined || filterRateTo === null) {
            filterRateTo = 5;
        }
        whereValue["rate"] = {
            [Op.between]: [filterRateFrom, filterRateTo]
        }

        // order
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
            orderValue.push(["downloadNum", "ASC"]);
        } else if (sortMethod === "downloadsDESC") {
            // downloads descending
            // console.log("=========================");
            // console.log("downloads DESC");
            // console.log("=========================");
            orderValue.push(["downloadNum", "DESC"]);
        } else if (sortMethod === "likesASC") {
            // likes ascending
            orderValue.push(["likes", "ASC"]);
        } else if (sortMethod === "likesDESC") {
            // likes descending
            orderValue.push(["likes", "DESC"]);
        } else if (sortMethod === "rateASC") {
            // rate ascending
            orderValue.push(["rate", "ASC"])
        } else if (sortMethod === "rateDESC") {
            // rate descending
            orderValue.push(["rate", "DESC"]);
        } else {
            // default - time descending - latest post first
            orderValue.push(["dateUpdated", "DESC"]);
        }

        console.log("whereValue: ", whereValue);

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
        let filename = content.filename;
        let key = email;
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
    return new Promise(function(resolve, reject) {
        let email = content.email;
        let filename = content.filename;
        let key = content.key;

        if (key === undefined || key === null) {
            key = email + '|' + filename;
        }

        let params = {
            Bucket: BucketName,
            Key: key
        }

        // add 1 onto the files download column
        fileDownloaded(key);

        // get download URL
        s3.getSignedUrl('getObject', params, function(err, url) {
            if (err) {
                reject(err);
            } else {
                let result = {
                    "status": 200,
                    "URL": url
                }
                resolve(result);
            }
        })
    })
}

async function getInfoFromKey(key) {
    return new Promise(function(resolve) {
        let n = files.findOne({
            where: {
                key: key
            }
        })
        resolve(n);
    })
}

async function fileDownloaded(key) {
    getInfoFromKey(key)
        .then(result => {
            if (result === undefined || result === null) {
                return
            }
            let n = result.dataValues.downloadNum;
            if (n === undefined) {
                return
            }
            n = n + 1;
            files.update({
                downloadNum: n
            }, {
                where: {
                    key: key
                }
            })
        })
}

exports.getFileDetail = async function(content) {
    // serach details of the file, by either key or email and filename
    let key = content.key;
    let email = content.email;
    let filename = content.filename;

    if (key === undefined || key === null) {
        // get key from email and filename if key does not exist
        key = email + "|" + filename;
    }

    let file_info = files.findOne({
        where: {
            key: key
        }
    })

    return file_info;
}

exports.editFileDetail = async function(content) {

    console.log("edit file: ", content);

    // serach details of the file, by either key or email and filename
    let key = content.key;
    let email = content.email;
    let filename = content.filename;
    let type = content.type;
    let anonymous = content.anonymous;

    if (key === undefined || key === null) {
        // get key from email and filename if key does not exist
        key = email + "|" + filename;
    }

    console.log("editing file: ", key);

    let d = new Date();
    let date = "" + d.getTime();

    files.update({
        type: type,
        dateUpdated: date,
        anonymous: anonymous
    }, { where: { key: key } })

}


exports.likeFile = async function(content) {

    console.log("like file: ", content);

    // serach details of the file, by either key or email and filename
    let key = content.key;
    let email = content.email;
    let filename = content.filename;

    if (key === undefined || key === null) {
        // get key from email and filename if key does not exist
        key = email + "|" + filename;
    }

    console.log("addlike file: ", key);

    let likefile = await files.findOne({
        where: {
            key: key
        }
    });

    let likes = likefile.likes;
    files.update({ likes: likes + 1 }, { where: { key: key } })

}

exports.unlikeFile = async function(content) {

    console.log("unlike file: ", content);

    // serach details of the file, by either key or email and filename
    let key = content.key;
    let email = content.email;
    let filename = content.filename;

    if (key === undefined || key === null) {
        // get key from email and filename if key does not exist
        key = email + "|" + filename;
    }

    let unlikefile = await files.findOne({
        where: {
            key: key
        }
    });

    let likes = unlikefile.likes;
    files.update({ likes: likes - 1 }, { where: { key: key } })

}


exports.deleteFile = async function(key) {
    files.destroy({
        where: {
            key: key
        }
    });

    var params = {
        Bucket: BucketName,
        Key: key
    };

    var infoparams = {
        Bucket: BucketName,
        Key: "Info|" + key
    };

    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });

    s3.deleteObject(infoparams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });

    // Note: did not delete the file info from the server

}

exports.updateRate = async function(content) {
    let file_id = content.file_id;
    let rate = content.rate;

    await files.update({
        rate: rate
    }, {
        where: {
            fileID: file_id
        }
    })

    return 0;
}