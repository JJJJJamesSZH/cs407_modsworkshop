import { user_login } from "./entity/user_login";

exports.checkDuplicate = async function(email) {
    let list = await user_login.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 1) {
        return true; // duplicate exists
    } else {
        return false; // duplicate does not exist
    }
}

exports.addUser = async function(content) {
    let email = content.email;
    let password = content.password;
    let username = content.username;

    user_login.bulkCreate([
        { email: email, password: password, username: username }
    ])
}