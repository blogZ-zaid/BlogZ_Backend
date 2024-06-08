const logoutController = (store) => (req, res) => {
  const sessionId = req.session.id; // Get the session ID

  // Destroy the session from the store and in-memory
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Error logging out" });
    } else {
      // Also remove the session from the MongoDB collection
      store.destroy(sessionId, (err) => {
        if (err) {
          console.error("Error removing session from MongoDB store:", err);
          return res.status(500).json({ message: "Error logging out from MongoDB" });
        }
        return res.json({ message: "Logout successful" });
      });
    }
  });
};

module.exports = logoutController;
