const authMiddleware = (req, res, next) => {
  console.log('authMiddleware called');
  if (!req.session.userId) {
    console.log('Session after authMiddleware:', req.session); // Log the entire session object
    return res.json({ message: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;
