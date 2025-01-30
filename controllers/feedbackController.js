import Feedback from '../models/Feedback.js';

const submitFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      console.error('Feedback content is missing');
      return res.status(400).json({ success: false, message: 'Feedback is required' });
    }

    if (!req.user || !req.user.id) {
      console.error('User is not authenticated');
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const fullName = req.user.fullName;
    const registrationNo = req.user.registrationNo;


    const newFeedback = new Feedback({
      fullName,
      registrationNo,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { submitFeedback };