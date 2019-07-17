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

        let username = user_profile_func.getUsername({ email: email });
        let key = content.key;
        let file_id = files_func.files_search(key);


        // check if the user-file combination already exists
        let has_rated = user_rates.checkRate({ email: email, file_id: file_id });

        let data = {
            email: email,
            username: username,
            file_id: file_id,
            rate: rate
        }

        if (has_rated === false) {
            // user rates not exists yet
            user_rates.rateFile(data);
        } else {
            // user rates exists
            user_rates.updateRate(data);
        }

        // update the file rate in files table
        let new_rate = await user_rates.calcRate(file_id);
        await files_func.updateRate({ file_id: file_id, rate: new_rate });

        return {
            status: 200
        }
    }
}