const userModel = require("../models/userModel.js");

const signupController = async (req, res) => {
    try {
        
        const userdata = {
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
        };
        const check = await userModel.findOne({ email: userdata.email });

        if (check) {
            res.json("User Exists");
        } else {
            await userModel.create(userdata);
            res.json("User Does Not Exist");
        }
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = signupController;