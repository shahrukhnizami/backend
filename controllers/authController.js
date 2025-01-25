import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendResponse from "../helpers/sendResponse.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, 400, null, true, "User already exists");
    }

    const newUser = await User.create({ name, email, password });
    sendResponse(res, 201, { id: newUser._id }, false, "User registered successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, null, true, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, null, true, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    sendResponse(res, 200, { token }, false, "Login successful");
  } catch (error) {
    sendResponse(res, 500, null, true, "Login failed");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    sendResponse(res, 200, users, false, "Users fetched successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "Failed to fetch users");
  }
};

export { register, login, getAllUsers };
