const userModel=require("../models/userModel.js")

const getAllUsersController= async(req,res) =>{

    try {
      
        const userId = req.query.userId;
        let allUsers = await userModel.find();
    
        let allUsersExceptOwn=[];
    
        for(let user of allUsers){ 
                if(user._id != userId){
                  let obj={
                    fullName:user.fullName,
                    email:user.email,
                    id:user._id
                  }
                    allUsersExceptOwn.push(obj);
                }
        }
        if (allUsersExceptOwn.length <0) {
          return res.json({ message: "No People found to follow" });
        } else {
          return res.json({ message: "Successfull", allUsersExceptOwn });
        }
      } catch (error) {
        console.error("Error getting note:", error);
        return res.status(500).json({ message: "Error getting note" });
      }
}
module.exports = getAllUsersController;