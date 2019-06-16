const baseController = require("./baseController");
const userLogin = require("../model/user_login");

class accountController extends baseController {
    async register(content) {
        // registration
        console.log("accountController.registration: ", content);

        let duplicates = await userLogin.checkDuplicate(content);
        console.log("duplicates: ", duplicates);
        // email username 0

        // duplicate username
        if (duplicates === 'username') {
            let result = {
                "status": 201,
                "err_message": "duplicate username exists"
            }
            return result;
        }

        // duplicate email
        if (duplicates === 'email') {
            let result = {
                "status": 202,
                "err_message": "duplicate email exists"
            }
            return result;
        }

        userLogin.addUser(content);

        let result = {
            "status": 200
        }
        return result;
    }

    async emailVeri(content) {
        // send email verification
        console.log("accountController.emailVeri: ", content);
        let email = content.email;

        var send = require('../../common/tools/emailer.js');
        var v_code = require('../../common/tools/veri_code_generator.js');

        var v = v_code(1);
        console.log("verification code generated: ", v);

        var txt = 'This is your ModsWorkshop verification code:\n\n\t';
        txt += v;
        txt += '\n\nPlease do not share with other people.\n';

        var mail = {
            from: 'ModsWorkshop Team',
            subject: 'Verification Codes [Do not reply]',
            to: email,
            text: txt
        }

        send(mail);

        let response = {
            "status": 200,
            "verification": v
        };

        return response;
    }
}

module.exports = accountController;