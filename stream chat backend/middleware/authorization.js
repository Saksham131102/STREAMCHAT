import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }
    // Attach user to request object
    req.user = user;
    // Call next middleware or controller
    next();
  } catch (error) {
    console.log("Error in authorization middleware", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default authorize;
