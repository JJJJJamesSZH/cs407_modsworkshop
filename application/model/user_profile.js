import { user_profile } from "./entity/user_profile"
import { files } from "./entity/files"

var Sequelize = require('sequelize');

exports.getUsername = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.username;
}

exports.getEmail = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.email;
}

exports.getDescription = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.description;
}

exports.getIcon = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.icon;
}

exports.getProfile = async function(content) {
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile;
}

exports.getUploadFile = async function(content) {
    console.log("======= user_profile.getUploadFile =========");
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.uploadfile;
}

exports.getfavoritefile = async function(content) {
    console.log("======= user_profile.getfavoritefile =========");
    let email = content.email;
    let profile = await user_profile.findOne({
        where: {
            email: email
        }
    });
    return profile.favoritefile;
}

exports.setUploadFile = async function(content) {
    let email = content.email;
    let uploadfile = content.uploadfile;
    console.log("======= user_profile.setUploadFile =========");
    console.log("email: ", email);
    console.log("uploadfile: ", uploadfile);
    // await setTimeout(function() {}, 100, 'funky');
    await user_profile.update({
        uploadfile: uploadfile
    }, {
        where: {
            email: email
        }
    })
}

exports.setfavoritefile = async function(content) {
    let email = content.email;
    let favoritefile = content.favoritefile;
    console.log("======= user_profile.setfavoritefile =========");
    console.log("email: ", email);
    console.log("favoritefile: ", favoritefile);
    // await setTimeout(function() {}, 100, 'funky');
    await user_profile.update({
        favoritefile: favoritefile
    }, {
        where: {
            email: email
        }
    })
}

exports.editUsername = async function(content) {
    let email = content.email;
    let username = content.username;

    // check if username exists before updating it
    // let list = await user_profile.findAll({
    //     where: {
    //         username: username
    //     }
    // });

    // if (list.length === 1) {
    //     return '1'; // duplicate username exists
    // } else {
    //     user_profile.update({ username: username }, { where: { email: email } })
    //     return '0'; // duplicate username or email does not exist
    // }

    await user_profile.update({
        username: username
    }, {
        where: {
            email: email
        }
    });

    await files.update({
        username: username
    }, {
        where: {
            email: email
        }
    })

    return 0;

}

exports.editDescription = async function(content) {
    let email = content.email;
    let description = content.description;

    user_profile.update({ description: description }, { where: { email: email } })

}

exports.editIcon = async function(content) {
    let email = content.email;
    let icon = content.icon;

    user_profile.update({ icon: icon }, { where: { email: email } })

}

exports.editProfile = async function(content) {
    let email = content.email;
    let username = content.username;
    let description = content.description;
    let icon = content.icon;

    // let list = await user_profile.findAll({
    //     where: {
    //         username: username
    //     }
    // });

    // if (list.length === 1) {
    //     return '1'; // duplicate username exists
    // } else {
    //     user_profile.update({
    //         description: description,
    //         username: username,
    //         icon: icon
    //     }, { where: { email: email } })
    //     return '0'; // duplicate username or email does not exist
    // }

    user_profile.update({
        description: description,
        username: username,
        icon: icon
    }, { where: { email: email } });
    return 0;

}

exports.deleteFavorite = async function(fileID) {
    const Op = Sequelize.Op;
    const operatorsAliases = {
        $like: Op.like,
        $not: Op.not
    }

    let favoriteuserlist = await user_profile.findAll({
        where: {favoritefile: {[Op.like]: '%' + fileID+"" + '%'}}
    });

    console.log("users: ", favoriteuserlist);
    
    var user;
    for(user of favoriteuserlist) {
        let favoritefileString = user.favoritefile;

        let thelist = favoritefileString.split(/[^0-9]/).map(Number);
        thelist = thelist.filter(Boolean);

        if (thelist.includes(fileID) === false) {
            console.log("fileID not in favoritelist", user.userID);
            continue;
        }

        let removed = thelist.indexOf(fileID);
        thelist.splice(removed, 1);
        // console.log("Updated favorite list: ", thelist);

        let favoritefileJSON = { content: thelist };
        favoritefileString = JSON.stringify(favoritefileJSON);

        this.setfavoritefile({
            email: user.email,
            favoritefile: favoritefileString
        });

        let result = {
            status: 200
        }

        return result;

    }
    
}