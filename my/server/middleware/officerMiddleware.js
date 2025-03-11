const officerMiddleware = (req, res, next) => {
  const user = req.user; // Assuming you attach the user object to the request in your auth middleware

  if (!user || !user.is_officer) {
    return res.status(403).json({ message: "Access denied. Officer privileges required." });
  }

  next();
};

module.exports = officerMiddleware;