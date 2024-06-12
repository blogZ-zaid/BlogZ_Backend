const postModel = require("../models/postModel.js");

const getAllPostController = async (req, res) => {
  try {
   
    let allPost = await postModel.find();

    let allPublicPosts=[];

    for(let posts of allPost){
        for(let post of posts.post){
            if(post.privacy === "everyone"){
                allPublicPosts.push(post)
            }
        }
    }
    if (allPublicPosts.length <0) {
      return res.json({ message: "No Posts" });
    } else {
      return res.json({ message: "Successfull", allPublicPosts });
    }
  } catch (error) {
    console.error("Error getting note:", error);
    return res.status(500).json({ message: "Error getting note" });
  }
};

module.exports = getAllPostController;
