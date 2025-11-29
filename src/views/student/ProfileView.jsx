import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Upload, Save, CreditCard as Edit3, GraduationCap, Award, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getProfile, updateProfile } from '../../lib/mockData';

const ProfileView = ({ onNavigate }) => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    graduationYear: new Date().getFullYear(),
    cgpa: 0,
    skills: [],
    bio: '',
    experience: [],
    projects: []
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      const profile = getProfile(user.id);
      setProfileData({
        fullName: profile.full_name || user.email,
        email: profile.email || user.email,
        phone: profile.phone || '+1-555-0123',
        studentId: profile.studentId || `STU${user.id}`,
        department: profile.department || 'Computer Science',
        graduationYear: profile.graduationYear || 2024,
        cgpa: profile.cgpa || 3.8,
        skills: profile.skills || ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        bio: profile.bio || 'Passionate computer science student with a strong foundation in web development and software engineering. Eager to apply my skills in a challenging internship or entry-level position.',
        experience: profile.experience || [
          {
            title: 'Web Development Intern',
            company: 'TechStart Inc.',
            duration: 'Summer 2023',
            description: 'Developed responsive web applications using React and Node.js'
          }
        ],
        projects: profile.projects || [
          {
            name: 'E-commerce Platform',
            description: 'Full-stack web application with React frontend and Node.js backend',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express']
          }
        ]
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateProfile = (data) => {
    const errors = [];
    
    if (!data.fullName || data.fullName.trim().length < 3) {
      errors.push('Full name must be at least 3 characters');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }
    
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    if (data.cgpa < 0 || data.cgpa > 4) {
      errors.push('CGPA must be between 0 and 4.0');
    }
    
    if (data.graduationYear < 2000 || data.graduationYear > 2050) {
      errors.push('Graduation year must be between 2000 and 2050');
    }
    
    if (!data.bio || data.bio.trim().length < 20) {
      errors.push('Bio must be at least 20 characters');
    }
    
    if (data.skills.length === 0) {
      errors.push('Please add at least one skill');
    }
    
    return errors;
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    const validationErrors = validateProfile(profileData);
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateProfile(user.id, profileData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-2 text-gray-600">Manage your personal information and showcase your skills</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-fadeIn">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-shake">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                      <Upload className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="text-xl font-semibold text-gray-900 text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
                )}
                
                <p className="text-gray-600 mt-1">{profileData.department} Student</p>
                <p className="text-sm text-gray-500">Class of {profileData.graduationYear}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-3" />
                  <span>ID: {profileData.studentId}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="number"
                      name="cgpa"
                      value={profileData.cgpa}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="4"
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>CGPA: {profileData.cgpa}/4.0</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600">{profileData.bio}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-800 border border-blue-200"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
              <div className="space-y-4">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Resume/Document Upload Section - removed ResumeManager */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
              <p className="text-sm text-gray-600">Upload your resume and other documents in the Document Management section</p>
              <button 
                onClick={() => onNavigate?.('document-management')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Go to Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;