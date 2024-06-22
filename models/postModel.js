const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }, 
    fullName: { type: String },
    post: [{ // Array to store multiple posts
        title: { type: String },
        description: { type: String },
        privacy: { type: String },
        date: { type: String },
        image: { type: String } // Add image field
    }],
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
