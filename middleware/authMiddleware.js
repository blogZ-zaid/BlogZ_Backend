const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      console.log("User", req.session.userId);
      return res.json({ message: "Unauthorized" });
    }
    next();
  };
  
  module.exports = authMiddleware;
  