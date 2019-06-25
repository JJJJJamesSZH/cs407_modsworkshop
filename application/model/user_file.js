import { user_profile } from "./entity/user_profile";
import { files } from "./entity/files";

exports.getFiles = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });

    let fs = (profile.uploadfile).split(",");
    let result = [];

    console.log("files!!!", fs);
    var f;

    for (f of fs) {
        if (f != "") {
            let file_detail = await files.findOne({
                where: {
                    fileID: f
                }
            });
            result.push(file_detail);
        }
    }

    return result;
}

exports.userAddFile = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });

    let list = "";

    if (profile.uploadfile == null){
        list = content.fileID + ",";
    }
    else{
        list = profile.uploadfile + content.fileID + ",";
    }

    console.log("list", list);

    user_profile.update(
        { uploadfile: list },
        { where: { email: email} }
    )
    
    return "0";

}

exports.userDeleteFile = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });

    var str = profile.uploadfile;
    let list = str.replace(content.fileID + ",", "");

    user_profile.update(
        { uploadfile: list },
        { where: { email: email} }
    )
    
    return "0";
}

