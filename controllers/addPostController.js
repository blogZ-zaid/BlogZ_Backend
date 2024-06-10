const postModel = require("../models/postModel.js");

const addPostController = async (req, res) => {

    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        console.log("In Add Post Controller loggedInuser ",loggedInUserId)
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
        const day = currentDate.getDate();
        
        const date = `${year}-${month}-${day}`;
        // Check if the user already has notes
        let userPosts = await postModel.findOne({ userId: loggedInUserId });
       

        // If the user does not have any notes, create a new note document
        if (!userPosts) {
            userPosts = new postModel({
                userId: loggedInUserId,
                post: [{
                    title: req.body.title,
                    description: req.body.description,
                    privacy:req.body.privacy,
                    date:date
                }]
            });
            await userPosts.save();
        } else {
            // If the user already has notes, append the new note to the existing notes array
            userPosts.post.push({
                title: req.body.title,
                description: req.body.description,
                privacy:req.body.privacy,
                date:date
            });
            await userPosts.save();
        }

        return res.json({ message: "Note saved successfully" });
    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }
}

module.exports = addPostController;
