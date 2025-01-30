import Blog from '../models/blogSchema.js';
import User from '../models/userModel.js';

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate('authorId', 'fullName course year'); // Populate author details
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newBlog = new Blog({
      authorId: req.user._id,
      content: req.body.content
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    blog.replies.push({ content: req.body.content });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};