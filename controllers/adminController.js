// import validator from "validator";
// import bcrypt from "bcrypt";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import jwt from "jsonwebtoken";
// import appointmentModel from "../models/appointmentModel.js";
// import userModel from "../models/userModel.js";

// // api for adding doctor
// const addDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//     } = req.body;

//     const imageFile = req.file;

//     // Log received fields
//     console.log("Received fields:", {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//       imageFile,
//     });

//     // checking for all data to add doctor
//     if (!name) return res.status(400).json({ message: "Name is required" });
//     if (!email) return res.status(400).json({ message: "Email is required" });
//     if (!password) return res.status(400).json({ message: "Password is required" });
//     if (!speciality) return res.status(400).json({ message: "Speciality is required" });
//     if (!degree) return res.status(400).json({ message: "Degree is required" });
//     if (!experience) return res.status(400).json({ message: "Experience is required" });
//     if (!about) return res.status(400).json({ message: "About is required" });
//     if (!fees) return res.status(400).json({ message: "Fees are required" });
//     if (!address) return res.status(400).json({ message: "Address is required" });
//     if (!imageFile) return res.status(400).json({ message: "Image file is required" });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Upload image to Cloudinary
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//       resource_type: "image",
//     });

//     const imageUrl = imageUpload.secure_url;

//     // Doctor data
//     const doctorData = {
//       name,
//       email,
//       image: imageUrl,
//       password: hashedPassword,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address: JSON.parse(address),
//       date: Date.now(),
//     };

//     // Save doctor data to database
//     const newDoctor = new doctorModel(doctorData);
//     await newDoctor.save();

//     res.status(201).json({ message: "Doctor added successfully" });
//   } catch (error) {
//     res.status(500).json({ sucess: false, message: error.message });
//   }
// };

// //API for admin
// const loginAdmin = async (req, res) => {

//   try{

//     const {email, password} = req.body; 
    
//     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
//       const token = jwt.sign(email+password, process.env.JWT_SECRET);
    
//        res.json({success: true, message: "Login Successful", token});


//     } else {
//       res.json({success: false, message: "Invalid Email or Password"});
//     }

//   } catch (error){
//     console.log(error);
//     res.json({success: false, message: error.message});
//   }
 
// }
// //api to get all doctors list for dmin pannel
// const allDoctors = async (req, res ) =>{
//   try{
//     const doctors = await doctorModel.find({}).select('-password')
//     res.json({success:true, doctors})

//   } catch (error){
//     console.log(error);
//     res.json({success: false, message: error.message});
//   }
// }



// //api to get all appointment list

// const appointmentsAdmin=  async (req,res) =>{
// try {
  
// const appointments = await appointmentModel.find({})

// res.json({success:true,appointments})

// } catch (error) {
//   console.log(error);
//   res.json({success: false, message: error.message});
// }


// }


// // Add cancelAppointment function

// const appointmentCancel = async (req, res) => {
//   try {
//     const {  appointmentId } = req.body;

//     const appointmentData = await appointmentModel.findById(appointmentId);

 

//     //delete appointment
//     await appointmentModel.findByIdAndUpdate(appointmentId, {
//       cancelled: true,
//     });
//     // releasing doctor slot
//     const { docId, slotDate, slotTime } = appointmentData;
//     const doctorData = await doctorModel.findById(docId);

//     let slots_booked = doctorData.slots_booked;

//     slots_booked[slotDate] = slots_booked[slotDate].filter(
//       (e) => e !== slotTime
//     );

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     res.json({ success: true, message: "Appointment cancelled" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// //   api admin dashboard

// const adminDashboard = async (req,res) =>{
 
//   try {


// const doctors = await doctorModel.find({})

// const users  = await userModel.find({})

// const appointments = await appointmentModel.find({})

// const dashData = {

// doctors: doctors.length,
// appointments: appointments.length, 
// patients: users.length,
// latestAppointments: appointments.reverse().slice(0,5)

// }

// res.json({success:true, dashData})


    
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }



// }















// export { addDoctor , loginAdmin , allDoctors , appointmentsAdmin ,appointmentCancel ,adminDashboard  };