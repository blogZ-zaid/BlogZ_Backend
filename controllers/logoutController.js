const logoutController = (req, res) => {
    // Destroy the session to logout the user
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Error logging out" });
      } else {
        return res.json({ message: "Logout Successfull" });
      }
    });
  }
  
  module.exports = logoutController;
  