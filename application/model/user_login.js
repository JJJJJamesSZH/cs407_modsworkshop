import { user_login } from "./entity/user_login"
const bcryptjs = require("bcryptjs");

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
    let raw_password = content.password;
    let username = content.username;

    let salt = bcryptjs.genSaltSync(10);
    let encryp_password = bcryptjs.hashSync(raw_password, salt);
    console.log("encryp_password: ", encryp_password);

    user_login.bulkCreate([{
        email: email,
        password: encryp_password,
        username: username
    }])
}

exports.deleteRow = async function(content) {
    let email = content.email;
    let username = content.username;

    if (email !== undefined) {
        user_login.destroy({
            where: {
                email: email
            }
        });
    }
    if (username !== undefined) {
        user_login.destroy({
            where: {
                username: username
            }
        });
    }
}

exports.checkPassword = async function(content) {
    // checking the provided password and the encrypted password in DB
    let email = content.email;
    let password = content.password;

    let list = await user_login.findAll({
        where: {
            email: email
        }
    })

    if (list.length === 0) {
        // user does not exist
        let result = {
            "status": 201,
            "err_message": "email does not exist"
        }
        return result;
    }

    let data = list[0].dataValues;
    console.log("model/user_login/data.password: ", data.password);
    console.log("model/user_login/passwrod: ", password);
    let comp_result = await bcryptjs.compareSync(password, data.password);

    if (comp_result) {
        console.log("comp_result: ", comp_result);
        let result = {
            "status": 200
        }
        return result;
    } else {
        console.log("comp_result: ", comp_result);
        let result = {
            "status": 202,
            "err_message": "incorrect password"
        }
        return result;
    }
}