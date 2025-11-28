import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, XCircle, AlertCircle, Briefcase, Users } from 'lucide-react';
import { getData } from '../../lib/mockData';

const RecentActivity = () => {
  const { user, userProfile } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user && userProfile) {
      const data = getData();
      const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
      const recentActivities = [];

      switch (userProfile.role) {
        case 'admin':
          // Show recent registrations, applications, and jobs
          const recentUsers = users.slice(-3).reverse();
          recentUsers.forEach(u => {
            if (u.id !== user.id) {
              recentActivities.push({
                title: `New ${u.role} registered`,
                description: `${u.full_name} created an account`,
                time: 'Recently',
                type: 'success',
                icon: Users
              });
            }
          });

          const recentJobs = (data.jobs || []).slice(-2).reverse();
          recentJobs.forEach(job => {
            recentActivities.push({
              title: 'New job posted',
              description: `${job.title} at ${job.company}`,
              time: new Date(job.postedDate).toLocaleDateString(),
              type: 'info',
              icon: Briefcase
            });
          });
          break;

        case 'student':
          // Show student's applications and interviews
          const studentApps = (data.applications || []).filter(a => a.studentId === user.id);
          studentApps.slice(-3).reverse().forEach(app => {
            const job = (data.jobs || []).find(j => j.id === app.jobId);
            if (job) {
              recentActivities.push({
                title: 'Application submitted',
                description: `Applied for ${job.title} at ${job.company}`,
                time: new Date(app.appliedDate).toLocaleDateString(),
                type: app.status === 'accepted' ? 'success' : 'info',
                icon: app.status === 'accepted' ? CheckCircle : AlertCircle
              });
            }
          });

          const studentInterviews = (data.interviews || []).filter(i => i.studentId === user.id);
          studentInterviews.forEach(interview => {
            recentActivities.push({
              title: 'Interview scheduled',
              description: `Interview on ${new Date(interview.date).toLocaleDateString()}`,
              time: 'Upcoming',
              type: 'success',
              icon: CheckCircle
            });
          });

          // Show available jobs if no activities
          if (recentActivities.length === 0) {
            const availableJobs = (data.jobs || []).filter(j => j.status === 'active').slice(0, 3);
            availableJobs.forEach(job => {
              recentActivities.push({
                title: 'New job available',
                description: `${job.title} at ${job.company} - ${job.salary}`,
                time: new Date(job.postedDate).toLocaleDateString(),
                type: 'info',
                icon: Briefcase
              });
            });
          }
          break;

        case 'employer':
          // Show applications for employer's jobs
          const employerJobs = (data.jobs || []).filter(j => j.employerId === user.id);
          const employerJobIds = employerJobs.map(j => j.id);
          const employerApps = (data.applications || []).filter(a => employerJobIds.includes(a.jobId));
          
          employerApps.slice(-3).reverse().forEach(app => {
            const job = employerJobs.find(j => j.id === app.jobId);
            const applicant = users.find(u => u.id === app.studentId);
            if (job && applicant) {
              recentActivities.push({
                title: 'New application received',
                description: `${applicant.full_name} applied for ${job.title}`,
                time: new Date(app.appliedDate).toLocaleDateString(),
                type: 'info',
                icon: AlertCircle
              });
            }
          });

          // Show posted jobs if no applications
          if (recentActivities.length === 0) {
            employerJobs.slice(-3).reverse().forEach(job => {
              recentActivities.push({
                title: 'Job posted',
                description: `${job.title} - ${job.salary}`,
                time: new Date(job.postedDate).toLocaleDateString(),
                type: 'success',
                icon: Briefcase
              });
            });
          }
          break;

        case 'placement_officer':
          // Show placements and applications
          const recentPlacements = (data.placements || []).slice(-2).reverse();
          recentPlacements.forEach(placement => {
            const student = users.find(u => u.id === placement.studentId);
            if (student) {
              recentActivities.push({
                title: 'Student placed',
                description: `${student.full_name} placed at ${placement.company} - ${placement.package}`,
                time: new Date(placement.placedDate).toLocaleDateString(),
                type: 'success',
                icon: CheckCircle
              });
            }
          });

          const allApplications = (data.applications || []).slice(-2).reverse();
          allApplications.forEach(app => {
            const job = (data.jobs || []).find(j => j.id === app.jobId);
            const student = users.find(u => u.id === app.studentId);
            if (job && student) {
              recentActivities.push({
                title: 'New application',
                description: `${student.full_name} applied for ${job.title}`,
                time: new Date(app.appliedDate).toLocaleDateString(),
                type: 'info',
                icon: AlertCircle
              });
            }
          });
          break;

        default:
          break;
      }

      // If no activities, show a welcome message
      if (recentActivities.length === 0) {
        recentActivities.push({
          title: 'Welcome to PlacementHub!',
          description: 'Your recent activities will appear here',
          time: 'Just now',
          type: 'info',
          icon: AlertCircle
        });
      }

      setActivities(recentActivities.slice(0, 5)); // Limit to 5 activities
    }
  }, [user, userProfile]);

  const getTypeColor = (type) => {
    const colors = {
      success: 'text-green-600',
      info: 'text-blue-600',
      warning: 'text-amber-600',
      error: 'text-red-600'
    };
    return colors[type] || 'text-gray-600';
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${getTypeColor(activity.type)} mt-1`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;