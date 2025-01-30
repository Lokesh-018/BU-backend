import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  registrationNo: { type: String, required: true },
  rollNo: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  department: { type: String, required: true },
  passedOutYear: { type: Number, required: true },
  github: { type: String },
  linkedin: { type: String },
  jobRole: { type: String },
  jobLocation: { type: String },
  
});

const User = mongoose.model('User', userSchema);

export default User;