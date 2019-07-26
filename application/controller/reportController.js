const baseController = require("./baseController");
const admin = '2789452491@qq.com'

class reportController extends baseController {
    async send_report(content) {
        // registration
        console.log("reportController.send_report: ", content);

        var send = require('../../common/tools/emailer.js');
        var email = content.email;
        var txt = "This is a report from user <";
        txt += email;
        txt += ">\n\n";
        txt += "File key: ";
        txt += content.key;
        txt += "\n\n";
        txt += "Reason: ";
        txt += content.reason;


        var mail = {
            from: 'User: ' + email,
            subject: 'Report from player in Mods Workshop',
            to: admin,
            text: txt
        };
        send(mail);

        let result = {status: 200};
        return result;

    }
}
module.exports = reportController;
