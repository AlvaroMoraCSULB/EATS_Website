const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Get token from header or cookies
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ 
      message: "Authentication required",
      code: "NO_TOKEN"
    });
  }

  try {
    console.log("Verifying token:", token); // Debug log
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        message: "User not found",
        code: "USER_NOT_FOUND" 
      });
    }

    // Attach user and token to request
    req.user = user;
    req.token = token;
    next();
    
  } catch (error) {
    console.error("Authentication error:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Token expired",
        code: "TOKEN_EXPIRED"
      });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        message: "Invalid token",
        code: "INVALID_TOKEN"
      });
    }
    
    return res.status(500).json({ 
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

module.exports = authMiddleware;