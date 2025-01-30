

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectClodinary from './config/cloudinary.js';
// import adminRouter from './routes/adminRoute.js';
// import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js';
import feedbackRoutes from './routes/feedbackRoutes.js'
import eventRegistrationsRouter from './routes/userRoute.js'
import blogRouter from './routes/blogRoutes.js';
// app config

const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectClodinary()

// middleware
app.use(express.json());
app.use(cors());

//api end point

// app.use('/api/admin',adminRouter)
// app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/feedback', feedbackRoutes);

//localhost:4000/api/admin/add-doctor

app.use('/api/event-registrations', eventRegistrationsRouter);

app.use('/api/blogs', blogRouter);

app.get('/',(req,res)=>{
    res.send('API WORKING '); 
})

app.listen(port, ()=> console.log("Server is running on port: ", port));