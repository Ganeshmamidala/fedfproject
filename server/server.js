import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration for GitHub Pages
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ganeshmamidala.github.io'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection - Use MongoDB Atlas connection string from environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://placementadmin:PlacementHub2024@cluster0.mongodb.net/placementhub?retryWrites=true&w=majority';

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  role: { type: String, enum: ['student', 'employer', 'admin', 'placement_officer'], required: true },
  status: { type: String, default: 'active' },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  type: { type: String },
  description: { type: String },
  requirements: { type: String },
  status: { type: String, default: 'active' },
  posted_by: { type: String },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
  job_id: { type: String, required: true },
  user_id: { type: String, required: true },
  status: { type: String, default: 'pending' },
  applied_date: { type: Date, default: Date.now },
  cover_letter: { type: String }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

// Initialize default users
async function initializeDefaultUsers() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        {
          email: 'admin@placementhub.edu',
          password: await bcrypt.hash('admin123', 10),
          full_name: 'System Administrator',
          role: 'admin'
        },
        {
          email: 'student@placementhub.edu',
          password: await bcrypt.hash('student123', 10),
          full_name: 'John Student',
          role: 'student'
        },
        {
          email: 'employer@company.com',
          password: await bcrypt.hash('employer123', 10),
          full_name: 'Jane Employer',
          role: 'employer'
        },
        {
          email: 'officer@placementhub.edu',
          password: await bcrypt.hash('officer123', 10),
          full_name: 'Mike Officer',
          role: 'placement_officer'
        }
      ];
      await User.insertMany(defaultUsers);
      console.log('✅ Default users created');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    initializeDefaultUsers();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// Routes

// Auth - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.last_login = new Date();
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      user: userResponse,
      token: 'mock-jwt-token-' + user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Auth - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      full_name,
      role: role || 'student'
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      user: userResponse,
      token: 'mock-jwt-token-' + user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Users - Get All
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Users - Get by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Users - Update
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Users - Delete
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs - Get All
app.get('/api/jobs', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const jobs = await Job.find(query).sort({ created_at: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs - Create
app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs - Update
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs - Delete
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs - Update Status
app.patch('/api/jobs/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Applications - Get All
app.get('/api/applications', async (req, res) => {
  try {
    const { user_id, status } = req.query;
    const query = {};
    if (user_id) query.user_id = user_id;
    if (status) query.status = status;
    const applications = await Application.find(query).sort({ applied_date: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Applications - Create
app.post('/api/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Applications - Update Status
app.patch('/api/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Applications - Withdraw
app.patch('/api/applications/:id/withdraw', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: 'withdrawn' },
      { new: true }
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'PlacementHub API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'PlacementHub API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      users: '/api/users/*',
      jobs: '/api/jobs/*',
      applications: '/api/applications/*'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});

export default app;
