import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    rollNo: { type: String, required: true },
    eventId: { type: Number, required: true },
    registeredAt: { type: Date, default: Date.now }
  });
  



const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

export default EventRegistration;