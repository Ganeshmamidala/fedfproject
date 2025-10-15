import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String
  },
  industry: {
    type: String
  },
  website: {
    type: String
  },
  address: {
    type: String
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  logo: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
