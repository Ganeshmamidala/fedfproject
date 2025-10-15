import express from 'express';
import Job from '../models/Job.js';
import Employer from '../models/Employer.js';

const router = express.Router();

// Get all jobs with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isActive: true };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by location
    if (location) {
      query.location = location;
    }

    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const jobs = await Job.find(query)
      .populate('employerId', 'companyName industry logo')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employerId', 'companyName companyDescription industry website address logo');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
});

// Create new job (employer only)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      salaryRange,
      applicationDeadline,
      employerId
    } = req.body;

    const job = new Job({
      employerId,
      title,
      description,
      requirements,
      location,
      jobType,
      salaryRange,
      applicationDeadline
    });

    await job.save();

    const populatedJob = await Job.findById(job._id)
      .populate('employerId', 'companyName industry logo');

    res.status(201).json({
      message: 'Job created successfully',
      job: populatedJob
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('employerId', 'companyName industry logo');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

// Get jobs by employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.employerId })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('Get employer jobs error:', error);
    res.status(500).json({ message: 'Error fetching employer jobs', error: error.message });
  }
});

export default router;
