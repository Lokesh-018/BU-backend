import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { v2 as cloudinary } from "cloudinary";













// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};




//api for user get profile data
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, userData: user });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



//api to upload user profile

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      gender,
      email,
      password,
      mobile,
      dob,
      registrationNo,
      rollNo,
      course,
      year,
      department,
      passedOutYear,
      jobLocation,
      github,
      linkedin,
      jobRole,
    } = req.body;

    const updateData = {
      fullName,
      gender,
      email,
      mobile,
      dob,
      registrationNo,
      rollNo,
      course,
      year,
      department,
      passedOutYear,
      jobLocation,
      github,
      linkedin,
      jobRole,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profilePic = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};



 const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      email,
      password,
      mobile,
      dob,
      registrationNo,
      rollNo,
      course,
      year,
      department,
      passedOutYear,
      github,
      linkedin,
      jobRole,
      jobLocation,
    } = req.body;

    // Check for required fields
    if (!fullName || !gender || !email || !password || !mobile || !dob || !registrationNo || !rollNo || !course || !year || !department || !passedOutYear) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


 // Upload profile picture to Cloudinary
 let profilePicUrl = '';
 if (req.file) {
   const result = await cloudinary.uploader.upload(req.file.path);
   profilePicUrl = result.secure_url;
 }




    // Create a new user
    const newUser = new User({
      fullName,
      gender,
      email,
      password: hashedPassword,
      mobile,
      dob,
      registrationNo,
      rollNo,
      course,
      year,
      department,
      passedOutYear,
      jobLocation,
      github,
      linkedin,
      jobRole,
      profilePic: profilePicUrl,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export { registerUser,getProfile ,loginUser,updateUserProfile };