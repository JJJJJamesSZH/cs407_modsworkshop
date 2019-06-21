import { user_profile } from "./entity/user_profile"

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

exports.editUsername = async function(content) {
    let email = content.email;
    let username = content.username;

    // check if username exists before updating it
    let list = await user_profile.findAll({
        where: {
            username: username
        }
    });

    if (list.length === 1) {
        return '1'; // duplicate username exists
    } else {
        user_profile.update(
            { username: username },
            { where: { email: email} }
        )
        return '0'; // duplicate username or email does not exist
    }

}

exports.editDescription = async function(content) {
    let email = content.email;
    let description = content.description;

    user_profile.update(
        { description: description },
        { where: { email: email} }
    )

}

exports.editIcon = async function(content) {
    let email = content.email;
    let icon = content.icon;

    user_profile.update(
        { icon: icon },
        { where: { email: email} }
    )

}

exports.editProfile = async function(content) {
    let email = content.email;
    let username = content.username;
    let description = content.description;
    let icon = content.icon;

    let list = await user_profile.findAll({
        where: {
            username: username
        }
    });

    if (list.length === 1) {
        return '1'; // duplicate username exists
    } else {
        user_profile.update(
            { 
                description: description,
                username: username,
                icon: icon
            },
            { where: { email: email} }
        )
        return '0'; // duplicate username or email does not exist
    } 
}