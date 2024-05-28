// This controller is used to check if the user is authenticated or not; every compoenent from the front end calls 
//this one to check the authentication from the use effect hook


const checkingAuthenticationController = async (req, res) => {
    try {
        if (req.session.userId) {
        return res.json({ message: "User is Authenticated" });
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.json({ message: "User is not Authenticated" });
    }
}

module.exports = checkingAuthenticationController;
