import express from "express";
import { registerUser, loginUser,logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = express.Router();

// ✅ Register Route (Admins can create admins)
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
   // Ensure logged-in user
  registerUser
);

// ✅ Login Route
router.post("/login", loginUser);
router.route("/logout").post(verifyJWT, logoutUser)
// ✅ Get User Profile (Both users and admins can access)
router.get("/profile", verifyJWT, (req, res) => res.json({ user: req.user }));

// ✅ Admin-Only Route (Example: Get All Users)
router.get("/admin/users", verifyJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
