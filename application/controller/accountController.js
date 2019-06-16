const baseController = require("./baseController");

class accountController extends baseController {
    async register(content) {
        // registration
        console.log("accountController.registration: ", content);

        let result = {
            "status": 200
        }
        return result;
    }

    async emailVeri(content) {
        // email verification
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