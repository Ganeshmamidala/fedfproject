import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

const router = express.Router();

// Apply for a job
router.post('/', async (req, res) => {
  try {
    const { jobId, studentId, coverLetter, resumeId } = req.body;

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: 'Job not found or no longer active' });
    }

    // Check if application deadline has passed
    if (job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ jobId, studentId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      jobId,
      studentId,
      coverLetter,
      resumeId,
      status: 'applied',
      statusHistory: [{
        status: 'applied',
        timestamp: new Date(),
        note: 'Application submitted'
      }]
    });

    await application.save();

    const populatedApplication = await Application.findById(application._id)
      .populate('jobId', 'title companyName location')
      .populate('studentId', 'name email');

    res.status(201).json({
      message: 'Application submitted successfully',
      application: populatedApplication
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get applications for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { studentId: req.params.studentId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate({
        path: 'jobId',
        populate: {
          path: 'employerId',
          select: 'companyName logo'
        }
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get student applications error:', error);
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get applications for a job
router.get('/job/:jobId', async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { jobId: req.params.jobId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('studentId', 'name email department graduationYear CGPA')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get single application
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: 'jobId',
        populate: {
          path: 'employerId',
          select: 'companyName companyDescription industry website logo'
        }
      })
      .populate('studentId', 'name email department graduationYear CGPA skills');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

// Update application status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, note } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    application.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Status changed to ${status}`
    });

    await application.save();

    const updatedApplication = await Application.findById(application._id)
      .populate('jobId', 'title companyName')
      .populate('studentId', 'name email');

    res.json({
      message: 'Application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

// Schedule interview
router.put('/:id/interview', async (req, res) => {
  try {
    const { interviewDate, interviewLocation, interviewType } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.interviewDate = interviewDate;
    application.interviewLocation = interviewLocation;
    application.interviewType = interviewType;
    application.status = 'interview_scheduled';

    application.statusHistory.push({
      status: 'interview_scheduled',
      timestamp: new Date(),
      note: `Interview scheduled for ${new Date(interviewDate).toLocaleString()}`
    });

    await application.save();

    const updatedApplication = await Application.findById(application._id)
      .populate('jobId', 'title companyName')
      .populate('studentId', 'name email');

    res.json({
      message: 'Interview scheduled successfully',
      application: updatedApplication
    });
  } catch (error) {
    console.error('Schedule interview error:', error);
    res.status(500).json({ message: 'Error scheduling interview', error: error.message });
  }
});

// Withdraw application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'withdrawn';
    application.statusHistory.push({
      status: 'withdrawn',
      timestamp: new Date(),
      note: 'Application withdrawn by student'
    });

    await application.save();

    res.json({ message: 'Application withdrawn successfully' });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ message: 'Error withdrawing application', error: error.message });
  }
});

export default router;
