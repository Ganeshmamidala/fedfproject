// Mock data management for PlacementHub
// This provides a simple in-memory database using localStorage

// Initialize data structure
const initializeData = () => {
  const defaultData = {
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
        description: 'Looking for talented software engineers',
        postedDate: new Date().toISOString(),
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
        description: 'Data analysis position',
        postedDate: new Date().toISOString(),
        status: 'active'
      }
    ],
    applications: [
      {
        id: '1',
        jobId: '1',
        studentId: '2',
        status: 'pending',
        appliedDate: new Date().toISOString()
      }
    ],
    placements: [
      {
        id: '1',
        studentId: '2',
        jobId: '1',
        company: 'Tech Corp',
        package: '12 LPA',
        placedDate: new Date().toISOString()
      }
    ],
    interviews: [
      {
        id: '1',
        applicationId: '1',
        studentId: '2',
        employerId: '3',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg2',
        conversationId: '2-3',
        senderId: '2',
        receiverId: '3',
        content: 'Thank you! I am very excited about this opportunity.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg3',
        conversationId: '2-3',
        senderId: '3',
        receiverId: '2',
        content: 'Great! We would like to schedule an interview. Are you available next week?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
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
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
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
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
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
        uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['react', 'certification', 'frontend'],
        isPublic: true,
        isFavorite: true,
        downloadCount: 12
      }
    ],
    profiles: {}
  };

  try {
    const stored = localStorage.getItem('placement-hub-data');
    if (!stored) {
      localStorage.setItem('placement-hub-data', JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading data:', error);
    return defaultData;
  }
};

// Save data to localStorage
const saveData = (data) => {
  try {
    localStorage.setItem('placement-hub-data', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Get all data
export const getData = () => {
  return initializeData();
};

// Jobs operations
export const getJobs = (filters = {}) => {
  const data = getData();
  let jobs = data.jobs || [];
  
  if (filters.employerId) {
    jobs = jobs.filter(job => job.employerId === filters.employerId);
  }
  if (filters.status) {
    jobs = jobs.filter(job => job.status === filters.status);
  }
  
  return jobs;
};

export const addJob = (jobData) => {
  const data = getData();
  const newJob = {
    id: Date.now().toString(),
    ...jobData,
    postedDate: new Date().toISOString(),
    status: 'active'
  };
  data.jobs = [...(data.jobs || []), newJob];
  saveData(data);
  return newJob;
};

// Applications operations
export const getApplications = (filters = {}) => {
  const data = getData();
  let applications = data.applications || [];
  
  if (filters.studentId) {
    applications = applications.filter(app => app.studentId === filters.studentId);
  }
  if (filters.jobId) {
    applications = applications.filter(app => app.jobId === filters.jobId);
  }
  if (filters.status) {
    applications = applications.filter(app => app.status === filters.status);
  }
  
  return applications;
};

export const addApplication = (applicationData) => {
  const data = getData();
  const newApplication = {
    id: Date.now().toString(),
    ...applicationData,
    appliedDate: new Date().toISOString(),
    status: 'pending'
  };
  data.applications = [...(data.applications || []), newApplication];
  saveData(data);
  return newApplication;
};

// Placements operations
export const getPlacements = (filters = {}) => {
  const data = getData();
  let placements = data.placements || [];
  
  if (filters.studentId) {
    placements = placements.filter(p => p.studentId === filters.studentId);
  }
  
  return placements;
};

export const addPlacement = (placementData) => {
  const data = getData();
  const newPlacement = {
    id: Date.now().toString(),
    ...placementData,
    placedDate: new Date().toISOString()
  };
  data.placements = [...(data.placements || []), newPlacement];
  saveData(data);
  return newPlacement;
};

// Interviews operations
export const getInterviews = (filters = {}) => {
  const data = getData();
  let interviews = data.interviews || [];
  
  if (filters.studentId) {
    interviews = interviews.filter(i => i.studentId === filters.studentId);
  }
  if (filters.employerId) {
    interviews = interviews.filter(i => i.employerId === filters.employerId);
  }
  
  return interviews;
};

export const addInterview = (interviewData) => {
  const data = getData();
  const newInterview = {
    id: Date.now().toString(),
    ...interviewData,
    status: 'scheduled'
  };
  data.interviews = [...(data.interviews || []), newInterview];
  saveData(data);
  return newInterview;
};

// Statistics helpers
export const getStatistics = (userId, userRole) => {
  const data = getData();
  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  
  switch (userRole) {
    case 'admin':
      return {
        totalUsers: users.length,
        activeJobs: (data.jobs || []).filter(j => j.status === 'active').length,
        totalApplications: (data.applications || []).length,
        totalPlacements: (data.placements || []).length,
        students: users.filter(u => u.role === 'student').length,
        employers: users.filter(u => u.role === 'employer').length,
        placementOfficers: users.filter(u => u.role === 'placement_officer').length
      };
    
    case 'student':
      return {
        availableJobs: (data.jobs || []).filter(j => j.status === 'active').length,
        myApplications: (data.applications || []).filter(a => a.studentId === userId).length,
        interviews: (data.interviews || []).filter(i => i.studentId === userId && i.status === 'scheduled').length,
        placements: (data.placements || []).filter(p => p.studentId === userId).length
      };
    
    case 'employer':
      const employerJobs = (data.jobs || []).filter(j => j.employerId === userId);
      const employerJobIds = employerJobs.map(j => j.id);
      return {
        postedJobs: employerJobs.length,
        activeJobs: employerJobs.filter(j => j.status === 'active').length,
        applicationsReceived: (data.applications || []).filter(a => employerJobIds.includes(a.jobId)).length,
        interviews: (data.interviews || []).filter(i => i.employerId === userId).length
      };
    
    case 'placement_officer':
      return {
        totalStudents: users.filter(u => u.role === 'student').length,
        placedStudents: (data.placements || []).length,
        activeJobs: (data.jobs || []).filter(j => j.status === 'active').length,
        activeCompanies: users.filter(u => u.role === 'employer').length,
        ongoingApplications: (data.applications || []).filter(a => a.status === 'pending').length,
        placementRate: users.filter(u => u.role === 'student').length > 0 
          ? Math.round(((data.placements || []).length / users.filter(u => u.role === 'student').length) * 100) 
          : 0
      };
    
    default:
      return {};
  }
};

// Reset data (for testing)
export const resetData = () => {
  localStorage.removeItem('placement-hub-data');
  return initializeData();
};

// Messages operations
export const getMessages = (userId1, userId2) => {
  const data = getData();
  const conversationId = [userId1, userId2].sort().join('-');
  return (data.messages || []).filter(m => m.conversationId === conversationId);
};

export const sendMessage = (fromId, toId, content) => {
  const data = getData();
  const conversationId = [fromId, toId].sort().join('-');
  const newMessage = {
    id: Date.now().toString(),
    conversationId,
    senderId: fromId,
    receiverId: toId,
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  data.messages = [...(data.messages || []), newMessage];
  saveData(data);
  return newMessage;
};

export const getConversations = (userId) => {
  const data = getData();
  const messages = data.messages || [];
  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  
  const conversationMap = new Map();
  
  messages.forEach(msg => {
    if (msg.senderId === userId || msg.receiverId === userId) {
      const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      const existing = conversationMap.get(otherId);
      
      if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
        conversationMap.set(otherId, msg);
      }
    }
  });
  
  return Array.from(conversationMap.entries()).map(([otherId, lastMessage]) => {
    const otherUser = users.find(u => u.id === otherId);
    const unreadCount = messages.filter(m => 
      m.senderId === otherId && m.receiverId === userId && !m.read
    ).length;
    
    return {
      userId: otherId,
      user: otherUser,
      lastMessage,
      unreadCount
    };
  }).sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
};

// Notifications operations
export const getNotifications = (userId) => {
  const data = getData();
  let notifications = (data.notifications || []).filter(n => n.userId === userId);
  
  // Add welcome notification if user has no notifications
  if (notifications.length === 0) {
    const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
    const user = users.find(u => u.id === userId);
    
    if (user) {
      const welcomeNotifications = [
        {
          id: `welcome-${userId}-1`,
          userId,
          type: 'success',
          title: 'Welcome to PlacementHub!',
          message: `Hi ${user.full_name || 'there'}! Complete your profile to get started with job applications.`,
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: `welcome-${userId}-2`,
          userId,
          type: 'info',
          title: 'Explore Job Opportunities',
          message: 'Browse through our latest job openings and find your perfect match!',
          timestamp: new Date().toISOString(),
          read: false
        }
      ];
      
      // Save welcome notifications
      data.notifications = [...(data.notifications || []), ...welcomeNotifications];
      saveData(data);
      notifications = welcomeNotifications;
    }
  }
  
  return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const addNotification = (userId, notification) => {
  const data = getData();
  const newNotification = {
    id: Date.now().toString(),
    userId,
    ...notification,
    timestamp: new Date().toISOString(),
    read: false
  };
  data.notifications = [...(data.notifications || []), newNotification];
  saveData(data);
  return newNotification;
};

export const markNotificationAsRead = (notificationId) => {
  const data = getData();
  data.notifications = (data.notifications || []).map(n =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  saveData(data);
};

export const deleteNotification = (notificationId) => {
  const data = getData();
  data.notifications = (data.notifications || []).filter(n => n.id !== notificationId);
  saveData(data);
};

// Documents operations
export const getDocuments = (filters = {}) => {
  const data = getData();
  let documents = data.documents || [];
  
  if (filters.userId) {
    documents = documents.filter(doc => doc.userId === filters.userId);
  }
  if (filters.type && filters.type !== 'all') {
    documents = documents.filter(doc => doc.type === filters.type);
  }
  if (filters.isPublic !== undefined) {
    documents = documents.filter(doc => doc.isPublic === filters.isPublic);
  }
  
  return documents;
};

export const addDocument = (documentData) => {
  const data = getData();
  const newDocument = {
    id: Date.now().toString(),
    ...documentData,
    uploadDate: new Date().toISOString(),
    downloadCount: 0,
    isFavorite: false
  };
  data.documents = [...(data.documents || []), newDocument];
  saveData(data);
  return newDocument;
};

export const deleteDocument = (documentId) => {
  const data = getData();
  data.documents = (data.documents || []).filter(d => d.id !== documentId);
  saveData(data);
};

export const toggleFavorite = (documentId) => {
  const data = getData();
  data.documents = (data.documents || []).map(d =>
    d.id === documentId ? { ...d, isFavorite: !d.isFavorite } : d
  );
  saveData(data);
};

// Profile operations
export const getProfile = (userId) => {
  const data = getData();
  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  const user = users.find(u => u.id === userId);
  
  if (!data.profiles) data.profiles = {};
  
  return {
    ...user,
    ...(data.profiles[userId] || {})
  };
};

export const updateProfile = (userId, profileData) => {
  const data = getData();
  if (!data.profiles) data.profiles = {};
  
  data.profiles[userId] = {
    ...(data.profiles[userId] || {}),
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  
  saveData(data);
  
  // Also update user in mock-users if full_name changed
  if (profileData.fullName) {
    const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, full_name: profileData.fullName } : u
    );
    localStorage.setItem('mock-users', JSON.stringify(updatedUsers));
  }
  
  return data.profiles[userId];
};
