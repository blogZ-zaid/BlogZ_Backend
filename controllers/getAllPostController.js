const postModel = require("../models/postModel.js");
const fs = require('fs').promises;
const path = require('path');

const getAllPostController = async (req, res) => {
  try {
    let allPosts = await postModel.find();
    let allPublicPosts = [];

    for (let posts of allPosts) {
      for (let post of posts.post) {
        if (post.privacy === "everyone") {
          // Construct the image path based on the saved image filename in the database
          const imagePath = post.image ? path.join(__dirname, `../public${post.image}`) : null;
          // Read the image file asynchronously
          let imageData = null;
          if (imagePath) {
            try {
              imageData = await fs.readFile(imagePath, { encoding: 'base64' });
            } catch (error) {
              console.error("Error reading image file:", error);
            }
          }

          // Push the post details along with image data to allPublicPosts
          allPublicPosts.push({
            title: post.title,
            description: post.description,
            privacy: post.privacy,
            date: post.date,
            image: imageData // base64-encoded image data or URL
          });
        }
      }
    }

    if (allPublicPosts.length === 0) {
      return res.json({ message: "No Posts" });
    } else {
      return res.json({ message: "Successful", allPublicPosts });
    }
  } catch (error) {
    console.error("Error getting posts:", error);
    return res.status(500).json({ message: "Error getting posts" });
  }
};

module.exports = getAllPostController;
