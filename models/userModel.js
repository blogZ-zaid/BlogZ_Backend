const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullName:{type:String},
    email:{type:String},
    phoneNumber:{type:String},
    password:{type:String},
});

userSchema.pre("save",function(next){
    const user = this;

    bcrypt.hash(user.password,10,(err,hash)=>{
        user.password = hash;
        next();
    })
});

const userModel = new mongoose.model("users",userSchema);
module.exports = userModel;

