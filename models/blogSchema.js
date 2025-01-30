import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference the User model
    required: true
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema]
});

export default mongoose.model('Blog', blogSchema);