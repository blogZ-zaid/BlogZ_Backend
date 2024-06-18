const userModel = require("../models/userModel.js");
const postModel = require("../models/postModel.js");
const fs = require('fs').promises;
const path = require('path');

const getUserProfileController = async (req, res) => {
    try {
        const userId = req.query.userId;

        let user = await userModel.findById(userId);
        if (user) {
            let userPosts = await postModel.find({ userId: userId });

            // Sum up the lengths of all the `post` arrays in userPosts
            let postCount = userPosts.reduce((acc, curr) => acc + curr.post.length, 0);

            // Extract the posts and convert the image paths to base64
            let posts = await Promise.all(userPosts.map(async (postDoc) => {
                return Promise.all(postDoc.post.map(async (post) => {
                    if (post.image) {
                        const imagePath = path.join(__dirname, `../public${post.image}`);
                        try {
                            const imageData = await fs.readFile(imagePath, { encoding: 'base64' });
                            return { ...post, image: imageData };
                        } catch (error) {
                            console.error("Error reading image file:", error);
                            return { ...post, image: null };
                        }
                    } else {
                        return post;
                    }
                }));
            }));

            // Flatten the array of posts arrays
            posts = posts.flat();

            let userObj = {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                followers: user.followers,
                following: user.following,
                followersCount: user.followersCount,
                followingCount: user.followingCount,
                postCount: postCount,
                posts: posts
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
