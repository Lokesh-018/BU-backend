import express from "express";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
import {getProfile, registerUser,loginUser,updateUserProfile} from "../controllers/userController.js"; 
import authMiddleware from '../middlewares/authMiddleware.js';


import EventRegistration  from '../models/EventRegistration.js'
// , getProfile, updateProfile



const userRouter = express.Router();


userRouter.post('/register', upload.single('profilePic'), registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authMiddleware, getProfile);
// userRouter.get('/get-profile', authUser, getProfile);
// userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);

userRouter.put('/update-profile', authMiddleware, updateUserProfile);


userRouter.post('/', async (req, res) => {
    try {
      const newRegistration = new EventRegistration(req.body);
      await newRegistration.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default userRouter;