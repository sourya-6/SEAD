import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role }, // Include role in token
    process.env.ACCESS_TOKEN_SECRET, // Use ACCESS_TOKEN_SECRET
    { expiresIn: "7d" }
  );
};
