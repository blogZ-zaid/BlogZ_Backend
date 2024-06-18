const userModel = require("../models/userModel.js");

const sendFollowRequestController = async (req, res) => {
    const userId = req.body.userId;
    const followedUserId = req.body.followUserId;
    const followedFullName = req.body.followUserName;

    try {
        const user = await userModel.findById(userId);
        const followedUserIdFound = await userModel.findById(followedUserId);

        if (user && followedUserIdFound) {
            // Update the followed user's followers array and followersCount
            await userModel.findByIdAndUpdate(followedUserId, {
                $inc: { followersCount: 1 },
                $push: { followers: { userId: userId, fullName: user.fullName } }
            });

            // Update the user's following array and followingCount
            await userModel.findByIdAndUpdate(userId, {
                $inc: { followingCount: 1 },
                $push: { following: { userId: followedUserId, fullName: followedFullName } }
            });

            return res.status(200).json({ message: "Follow request sent successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error processing follow request:", error);
        return res.status(500).json({ message: "Error processing follow request" });
    }
};

module.exports = sendFollowRequestController;
