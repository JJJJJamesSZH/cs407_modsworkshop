const baseController = require("./baseController");
const user_rates = require("../model/user_rates");
const user_profile_func = require("../model/user_profile");
const files_func = require("../model/files");

class rateController extends baseController {
    async rateFile(content) {
        // email, key, rate

        // aquiring data from content
        let email = content.email;
        let rate = content.rate;

        let username = await user_profile_func.getUsername({ email: email });
        let key = content.key;
        let file_id = await files_func.files_search(key);


        // check if the user-file combination already exists
        let has_rated = await user_rates.checkRate({ email: email, file_id: file_id });

        // console.log("email: ", email);
        // console.log("username: ", username);
        // console.log("file_id: ", file_id);
        // console.log("rate: ", rate);
        // console.log("has_rated: ", has_rated);

        let data = {
            email: email,
            username: username,
            file_id: file_id,
            rate: rate
        }

        if (has_rated === false) {
            // user rates not exists yet
            // console.log("user rates not exists yet");
            await user_rates.rateFile(data);
        } else {
            // user rates exists
            // console.log("user rates exists");
            await user_rates.updateRate(data);
        }

        // update the file rate in files table
        let new_rate = await user_rates.calcRate({file_id: file_id});
        await files_func.updateRate({ file_id: file_id, rate: new_rate });

        return {
            status: 200
        }
    }
}

module.exports = rateController;