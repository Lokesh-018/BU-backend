import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;