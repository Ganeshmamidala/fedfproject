import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: [
      'applied',
      'under_review',
      'shortlisted',
      'interview_scheduled',
      'interviewed',
      'selected',
      'rejected',
      'offer_extended',
      'offer_accepted',
      'offer_declined'
    ],
    default: 'applied'
  },
  coverLetter: {
    type: String
  },
  resumeUrl: {
    type: String
  },
  statusHistory: [{
    status: String,
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  interviewDate: {
    type: Date
  },
  interviewNotes: {
    type: String
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

// Index for querying applications by status and date
applicationSchema.index({ status: 1, createdAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
