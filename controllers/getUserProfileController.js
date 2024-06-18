const userModel = require("../models/userModel.js");
const postModel = require("../models/postModel.js");

const getUserProfileController = async (req, res) => {
    try {
        const userId = req.query.userId;

        let user = await userModel.findById(userId);
        if (user) {
            let userPosts = await postModel.find({ userId: userId });

            // Sum up the lengths of all the `post` arrays in userPosts
            let postCount = userPosts.reduce((acc, curr) => acc + curr.post.length, 0);

            let userObj = {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                followers: user.followers,
                following: user.following,
                followersCount: user.followersCount,
                followingCount: user.followingCount,
                postCount: postCount
            };

            return res.json({ message: "User Found", userObj });
        } else {
            return res.json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return res.status(500).json({ message: "Error getting user" });
    }
};

module.exports = getUserProfileController;
