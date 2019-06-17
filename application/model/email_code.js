import { email_code } from "./entity/user_login"

exports.updateCode = async function(content) {
    let email = content.email;
    let code = content.code;
    /**
     * If email does not exist, then add row into the table along with timestamp
     * If email already exists, then update the code with the newly generated one.
     */
}

exports.checkCode = async function(content) {
    let email = content.email;
    let code = content.code;
    /**
     * If timestamp is within the code valid time,
     *      if the code is corret,
     *          the code is valid, return true
     *      if the code is wrong,
     *          send feed back
     * If timestamp is out of the valid time,
     *      Ask to send the new code
     */
}