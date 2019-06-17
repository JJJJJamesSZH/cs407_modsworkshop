import { email_code } from "./entity/user_login"

exports.updateCode = async function(content) {
    let email = content.email;
    let code = content.code;
    await deleteOutDated();
    /**
     * If email does not exist, then add row into the table along with timestamp
     * If email already exists, then update the code with the newly generated one.
     */
    let list = email_code.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 0) {
        // email does not exist
        // create new row
        let curr_time = Date.now();
        email_code.bulkCreate([{
            email: email,
            code: code,
            timestamp: curr_time
        }]);
    } else {
        // email exists
        // update the current row
        let curr_time = Date.now();
        email_code.update({
            code: code,
            timestamp: curr_time
        }, {
            where: {
                email: email
            }
        })
    }
    // return a response
    let result = {
        "status": 200
    }
    return result;
}

exports.checkCode = async function(content) {
    let email = content.email;
    let code = content.code;
    await deleteOutDated();
    /**
     * if the code is corret,
     *    the code is valid, 
     *         delete the email-code combination 
     *                 and 
     *         return true
     * if the code is wrong, or does not exist (out of 10 min)
     *     send feed back, send code again.
     */
    let list = email_code.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 0) {
        // verification code expired
        let result = {
            "status": 201,
            "err_message": "verification code expired"
        }
        return result;
    } else {
        // verification code not expired, checking
        let data = list[0].dataValues;
        console.log(data);
        let v_code = data.code;
        if (code === v_code) {
            // code is correct
            // 1. Delete the existing code
            // 2. return with the correct status code.
            email_code.destroy({
                where: {
                    email: email
                }
            })

            let result = {
                "status": 200
            }
            return result;
        } else {
            // code is wrong
            let result = {
                "status": 202,
                "err_message": "The code entered is incorrect"
            }
            return result;
        }
    }
}

async function deleteOutDated() {
    let curr_time = Date.now();
    let ten_min = 10 * 60 * 1000; // 10min = 600000ms
    let check_time = curr_time - ten_min;
    // check time smaller than or equal to check_time
    // let the verification code be valid for 10 minutes
    email_code.destroy({
        where: {
            timestamp: {
                $lte: check_time
            }
        }
    })
}