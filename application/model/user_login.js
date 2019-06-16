import { user_login } from "./entity/user_login"

exports.checkDuplicate = async function(content) {
    let email = content.email;
    let username = content.username;
    let list = await user_login.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 1) {
        return 'email'; // duplicate email exists
    } else {

        list = await user_login.findAll({
            where: {
                username: username
            }
        });
        if (list.length === 1) {
            return 'username'; // duplicate username exists
        } else {
            return '0'; // duplicate username or email does not exist
        }
    }
}

exports.addUser = async function(content) {
    let email = content.email;
    let password = content.password;
    let username = content.username;

    user_login.bulkCreate([{
        email: email,
        password: password,
        username: username
    }])
}