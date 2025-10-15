import express from 'express';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Employer from '../models/Employer.js';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = { ...user.toObject() };

    if (user.role === 'student') {
      const studentProfile = await Student.findOne({ userId: user._id });
      profile.studentProfile = studentProfile;
    } else if (user.role === 'employer') {
      const employerProfile = await Employer.findOne({ userId: user._id });
      profile.employerProfile = employerProfile;
    }

    res.json(profile);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, ...otherFields } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update base user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    // Update role-specific profile
    if (user.role === 'student' && otherFields.studentProfile) {
      await Student.findOneAndUpdate(
        { userId: user._id },
        { $set: otherFields.studentProfile },
        { new: true, upsert: true }
      );
    } else if (user.role === 'employer' && otherFields.employerProfile) {
      await Employer.findOneAndUpdate(
        { userId: user._id },
        { $set: otherFields.employerProfile },
        { new: true, upsert: true }
      );
    }

    // Get updated profile
    const updatedUser = await User.findById(user._id).select('-password');
    let profile = { ...updatedUser.toObject() };

    if (user.role === 'student') {
      const studentProfile = await Student.findOne({ userId: user._id });
      profile.studentProfile = studentProfile;
    } else if (user.role === 'employer') {
      const employerProfile = await Employer.findOne({ userId: user._id });
      profile.employerProfile = employerProfile;
    }

    res.json({
      message: 'Profile updated successfully',
      user: profile
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

// Update student profile
router.put('/student/:userId', async (req, res) => {
  try {
    const studentProfile = await Student.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      message: 'Student profile updated successfully',
      profile: studentProfile
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({ message: 'Error updating student profile', error: error.message });
  }
});

// Update employer profile
router.put('/employer/:userId', async (req, res) => {
  try {
    const employerProfile = await Employer.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      message: 'Employer profile updated successfully',
      profile: employerProfile
    });
  } catch (error) {
    console.error('Update employer profile error:', error);
    res.status(500).json({ message: 'Error updating employer profile', error: error.message });
  }
});

// Add resume to student profile
router.post('/student/:userId/resume', async (req, res) => {
  try {
    const { fileName, fileUrl, isDefault } = req.body;

    const studentProfile = await Student.findOne({ userId: req.params.userId });
    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // If this resume is set as default, unset other resumes
    if (isDefault) {
      studentProfile.resumes.forEach(resume => {
        resume.isDefault = false;
      });
    }

    studentProfile.resumes.push({
      fileName,
      fileUrl,
      isDefault: isDefault || false,
      uploadedAt: new Date()
    });

    await studentProfile.save();

    res.json({
      message: 'Resume added successfully',
      profile: studentProfile
    });
  } catch (error) {
    console.error('Add resume error:', error);
    res.status(500).json({ message: 'Error adding resume', error: error.message });
  }
});

// Delete resume from student profile
router.delete('/student/:userId/resume/:resumeId', async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ userId: req.params.userId });
    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    studentProfile.resumes = studentProfile.resumes.filter(
      resume => resume._id.toString() !== req.params.resumeId
    );

    await studentProfile.save();

    res.json({
      message: 'Resume deleted successfully',
      profile: studentProfile
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
});

// Set default resume
router.put('/student/:userId/resume/:resumeId/default', async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ userId: req.params.userId });
    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    studentProfile.resumes.forEach(resume => {
      resume.isDefault = resume._id.toString() === req.params.resumeId;
    });

    await studentProfile.save();

    res.json({
      message: 'Default resume updated successfully',
      profile: studentProfile
    });
  } catch (error) {
    console.error('Set default resume error:', error);
    res.status(500).json({ message: 'Error setting default resume', error: error.message });
  }
});

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    
    const query = role ? { role } : {};
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

export default router;
