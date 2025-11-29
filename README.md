# 🎓 PlacementHub - Campus Placement Management System

A modern, full-featured web application for managing campus placements, connecting students with employers, and streamlining the recruitment process with professional UI/UX and comprehensive features.

## 🌐 Live Demo

**🔗 Deployed Application:** [https://ganeshmamidala.github.io/fedfproject/](https://ganeshmamidala.github.io/fedfproject/)

### ✨ What's New
- **Modern Landing Page**: Parallax effects, animated counters, floating elements
- **Real Company Logos**: Google, Microsoft, Amazon, Meta, Apple, and more
- **Enhanced Animations**: Smooth page transitions, hover effects, and scroll animations
- **Improved Validation**: Real-time form validation with visual feedback
- **Password Strength Indicator**: Visual meter showing password strength
- **Professional UI**: Glass morphism, gradient backgrounds, and modern design patterns

### Demo Accounts
Try the application with these pre-configured accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@placementhub.edu | admin123 |
| Student | student@placementhub.edu | student123 |
| Employer | employer@company.com | employer123 |
| Placement Officer | officer@placementhub.edu | officer123 |

## 🚀 Features

### 🏠 Modern Landing Page
- **Parallax Hero**: Stunning parallax effects with floating particles
- **Animated Statistics**: Counter animations showing 5000+ students, 250+ companies
- **Company Showcase**: Auto-scrolling carousel with real company logos
- **Smooth Animations**: Scroll-triggered animations throughout
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

### For Students
- **Browse Jobs**: Advanced filtering with search, location, job type, and salary range
- **Apply for Jobs**: Submit applications with cover letters and resumes
- **Track Applications**: Visual timeline showing application status progression
- **Resume Management**: Upload, manage, and set default resumes
- **Profile Management**: Maintain academic records, skills, projects, and experience
- **Real-time Notifications**: Stay updated on application status changes

### For Employers
- **Post Jobs**: Create and manage job postings
- **Review Applications**: View and filter student applications
- **Interview Scheduling**: Schedule and manage interviews
- **Company Profile**: Showcase company information and culture

### For Administrators
- **User Management**: Manage students, employers, and administrators
- **Analytics**: View placement statistics and insights
- **System Configuration**: Configure system settings and permissions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Community Server v6 or higher)
- **Git** (for cloning the repository)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions.

**Quick Setup:**
1. Install MongoDB Community Server
2. Start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/placement_tracking

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

Create a `.env.local` file for frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Application

**Development Mode:**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📂 Project Structure

```
project-main/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── Applications/   # Application-related components
│   │   ├── Auth/           # Authentication components
│   │   ├── Dashboard/      # Dashboard components
│   │   ├── Jobs/           # Job-related components
│   │   ├── Landing/        # Landing page
│   │   ├── Layout/         # Layout components
│   │   ├── Notifications/  # Notification components
│   │   └── Student/        # Student-specific components
│   ├── views/              # Page views
│   │   ├── admin/          # Admin views
│   │   ├── employer/       # Employer views
│   │   ├── student/        # Student views
│   │   └── shared/         # Shared views
│   ├── contexts/           # React contexts
│   ├── lib/                # Utilities and configurations
│   │   ├── api.ts          # API client
│   │   └── supabase.ts     # Supabase config (legacy)
│   └── types/              # TypeScript type definitions
├── server/                  # Backend source code
│   ├── models/             # Mongoose models
│   │   ├── User.js         # User model
│   │   ├── Student.js      # Student profile model
│   │   ├── Employer.js     # Employer profile model
│   │   ├── Job.js          # Job posting model
│   │   └── Application.js  # Application model
│   ├── routes/             # Express routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── jobs.js         # Job routes
│   │   ├── applications.js # Application routes
│   │   └── users.js        # User routes
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # JWT authentication
│   └── index.js            # Server entry point
├── public/                  # Static assets
├── .env                     # Backend environment variables
├── .env.local              # Frontend environment variables
└── package.json            # Project dependencies

```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/employer/:employerId` - Get employer's jobs

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/student/:studentId` - Get student's applications
- `GET /api/applications/job/:jobId` - Get job's applications
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/:id/status` - Update application status
- `PUT /api/applications/:id/interview` - Schedule interview
- `DELETE /api/applications/:id` - Withdraw application

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `PUT /api/users/student/:userId` - Update student profile
- `PUT /api/users/employer/:userId` - Update employer profile
- `POST /api/users/student/:userId/resume` - Add resume
- `DELETE /api/users/student/:userId/resume/:resumeId` - Delete resume
- `GET /api/users` - Get all users (admin only)

## 🎯 User Roles

### Student
- Browse and search jobs
- Apply for jobs with resume and cover letter
- Track application status
- Manage profile and resumes
- View interview schedules

### Employer
- Post and manage job listings
- Review student applications
- Schedule interviews
- Manage company profile
- Access analytics

### Admin
- Manage all users
- View system analytics
- Configure system settings
- Monitor all activities

## 🔒 Security & Validation Features

### Form Validation
- **Email Validation**: RFC 5322 compliant pattern matching
- **Password Strength**: 
  - Minimum 6 characters
  - Requires uppercase letter
  - Requires lowercase letter
  - Requires number
  - Visual strength indicator
- **Real-time Feedback**: Instant validation as you type
- **Input Constraints**: Length limits and pattern enforcement
- **Clear Error Messages**: Actionable, user-friendly error descriptions

### Security
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access control
- Input sanitization
- XSS protection
- CORS configuration
- Secure session management

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Building for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Email notifications
- [ ] Real-time messaging
- [ ] Document management system
- [ ] Advanced analytics dashboard
- [ ] Job recommendations engine
- [ ] Mobile responsive design improvements
- [ ] PWA support
- [ ] Export reports (PDF/Excel)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- All contributors and users of this system
