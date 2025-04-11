import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// ✅ Register User
export const registerUser = async (req, res) => {
  console.log('hey')
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If user tries to register as "admin", allow only if an existing admin is making the request
    if (role === "admin" && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create admin accounts" });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const logoutUser=async(req,res)=>{
  console.log("sourya*100")
  console.log(req.user)
  User.findByIdAndUpdate(
      req.user._id,
      {
          $unset:{ //here we use these to remove the refreshToken by changing it flag to 1
              refreshToken:1,
          }
          
      },
      {
          new:true
      }
  )
  const options={
      httpOnly:true,
      secure:true
  }
  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User logged Out"))
}



