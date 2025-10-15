import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['full_time', 'part_time', 'internship', 'contract'],
    required: true
  },
  salaryRange: {
    type: String
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search functionality
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ location: 1, jobType: 1, isActive: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
