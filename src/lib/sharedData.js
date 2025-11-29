// Centralized default data that will be the same across all deployments
// This ensures GitHub Pages and Netlify have identical starting data

export const SHARED_DEFAULT_DATA = {
  users: [
    {
      id: '1',
      email: 'admin@placementhub.edu',
      password: 'admin123',
      full_name: 'System Administrator',
      role: 'admin'
    },
    {
      id: '2',
      email: 'student@placementhub.edu',
      password: 'student123',
      full_name: 'John Student',
      role: 'student'
    },
    {
      id: '3',
      email: 'employer@company.com',
      password: 'employer123',
      full_name: 'Jane Employer',
      role: 'employer'
    },
    {
      id: '4',
      email: 'officer@placementhub.edu',
      password: 'officer123',
      full_name: 'Mike Officer',
      role: 'placement_officer'
    }
  ],
  
  jobs: [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Tech Corp',
      employerId: '3',
      location: 'Bangalore',
      salary: '12-15 LPA',
      type: 'Full-time',
      skills: ['JavaScript', 'React', 'Node.js'],
      description: 'Looking for talented software engineers to join our dynamic team. Experience with modern web technologies required.',
      postedDate: '2025-11-25T10:00:00.000Z',
      status: 'active'
    },
    {
      id: '2',
      title: 'Data Analyst',
      company: 'Analytics Inc',
      employerId: '3',
      location: 'Mumbai',
      salary: '8-10 LPA',
      type: 'Full-time',
      skills: ['Python', 'SQL', 'Excel'],
      description: 'Data analysis position for handling business intelligence and reporting.',
      postedDate: '2025-11-26T10:00:00.000Z',
      status: 'active'
    }
  ],
  
  applications: [
    {
      id: '1',
      jobId: '1',
      studentId: '2',
      status: 'pending',
      appliedDate: '2025-11-27T10:00:00.000Z'
    }
  ],
  
  placements: [
    {
      id: '1',
      studentId: '2',
      jobId: '1',
      company: 'Tech Corp',
      package: '12 LPA',
      placedDate: '2025-11-20T10:00:00.000Z'
    }
  ],
  
  interviews: [
    {
      id: '1',
      applicationId: '1',
      studentId: '2',
      employerId: '3',
      date: '2025-12-05T10:00:00.000Z',
      status: 'scheduled'
    }
  ],
  
  messages: [
    {
      id: 'msg1',
      conversationId: '2-3',
      senderId: '3',
      receiverId: '2',
      content: 'Hi! We received your application for the Software Engineer position.',
      timestamp: '2025-11-28T08:00:00.000Z',
      read: true
    },
    {
      id: 'msg2',
      conversationId: '2-3',
      senderId: '2',
      receiverId: '3',
      content: 'Thank you! I am very excited about this opportunity.',
      timestamp: '2025-11-28T09:00:00.000Z',
      read: true
    },
    {
      id: 'msg3',
      conversationId: '2-3',
      senderId: '3',
      receiverId: '2',
      content: 'Great! We would like to schedule an interview. Are you available next week?',
      timestamp: '2025-11-28T10:30:00.000Z',
      read: false
    }
  ],
  
  notifications: [],
  
  documents: [
    {
      id: 'doc1',
      userId: '2',
      name: 'John_Doe_Resume.pdf',
      type: 'resume',
      size: '245KB',
      uploadDate: '2025-11-20T10:00:00.000Z',
      tags: ['react', 'javascript', 'node', 'mongodb'],
      isPublic: false,
      isFavorite: true,
      downloadCount: 5
    },
    {
      id: 'doc2',
      userId: '2',
      name: 'Cover_Letter_TechCorp.pdf',
      type: 'cover-letter',
      size: '89KB',
      uploadDate: '2025-11-22T10:00:00.000Z',
      tags: ['software engineer', 'tech corp'],
      isPublic: false,
      isFavorite: false,
      downloadCount: 2
    },
    {
      id: 'doc3',
      userId: '2',
      name: 'ReactJS_Certificate.pdf',
      type: 'certificate',
      size: '156KB',
      uploadDate: '2025-11-15T10:00:00.000Z',
      tags: ['react', 'certification', 'frontend'],
      isPublic: true,
      isFavorite: true,
      downloadCount: 12
    }
  ],
  
  profiles: {}
};
