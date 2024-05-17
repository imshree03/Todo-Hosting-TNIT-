const bcrypt = require("bcrypt");
const User = require("../models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(200).json({
        success: true,
        message: "User Already Exisits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error while user signup", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registed.Please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email }).populate("todos");
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Doesn't Exists",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      return res.status(200).json({
        success: true,
        user,
        message: `Login Successful`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
