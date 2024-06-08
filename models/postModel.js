const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }, 
    post: [{ // Array to store multiple post
        title: { type: String },
        description: { type: String },
        date:{type: String}
    }],
  
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
