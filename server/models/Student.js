import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  graduationYear: {
    type: Number,
    required: true
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 4
  },
  skills: [{
    type: String
  }],
  bio: {
    type: String
  },
  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String
  }],
  resumes: [{
    name: String,
    uploadedAt: Date,
    size: String,
    url: String,
    isDefault: Boolean
  }],
  profilePicture: {
    type: String
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
