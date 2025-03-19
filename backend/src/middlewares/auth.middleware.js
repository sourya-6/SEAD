
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// ✅ Verify JWT Token
export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Check Role (Admin Only)
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
