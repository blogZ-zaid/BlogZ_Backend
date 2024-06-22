const multer = require('multer');
const path = require('path');
const postModel = require("../models/postModel.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

const addPostController = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error uploading file" });
        }

        try {
            const userId = req.body.userId;
            const fullName=req.body.fullName;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
            const day = currentDate.getDate();
            const date = `${year}-${month}-${day}`;
            const image = req.file ? `/assets/uploads/${req.file.filename}` : null;

            // Check if the user already has notes
            let userPosts = await postModel.findOne({ userId: userId });

            // If the user does not have any notes, create a new note document
            if (!userPosts) {
                userPosts = new postModel({
                    userId: userId,
                    fullName:fullName,
                    post: [{
                        title: req.body.title,
                        description: req.body.description,
                        privacy: req.body.privacy,
                        date: date,
                        image: image
                    }]
                });
                await userPosts.save();
            } else {
                // If the user already has notes, append the new note to the existing notes array
                userPosts.post.push({
                    title: req.body.title,
                    description: req.body.description,
                    privacy: req.body.privacy,
                    date: date,
                    image: image
                });
                await userPosts.save();
            }

            return res.json({ message: "Note saved successfully" });
        } catch (error) {
            console.error("Error saving note:", error);
            return res.status(500).json({ message: "Error saving note" });
        }
    });
};

module.exports = addPostController;
