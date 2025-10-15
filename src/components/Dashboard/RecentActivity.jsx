import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecentActivity = () => {
  const { userProfile } = useAuth();

  // Mock data - in real app, this would come from API
  const getActivitiesForRole = () => {
    switch (userProfile?.role) {
      case 'admin':
        return [
          { 
            title: 'New employer registered', 
            description: 'TechCorp Solutions created an account',
            time: '2 hours ago',
            type: 'success',
            icon: CheckCircle
          },
          { 
            title: 'Job application submitted', 
            description: 'Sarah Johnson applied for Software Engineer position',
            time: '4 hours ago',
            type: 'info',
            icon: AlertCircle
          },
          { 
            title: 'User verification pending', 
            description: '3 new users awaiting verification',
            time: '1 day ago',
            type: 'warning',
            icon: Clock
          }
        ];
      
      case 'student':
        return [
          { 
            title: 'Application status updated', 
            description: 'Your application for Software Engineer at TechCorp is under review',
            time: '1 hour ago',
            type: 'info',
            icon: AlertCircle
          },
          { 
            title: 'New job matching your profile', 
            description: 'Frontend Developer position at StartupXYZ',
            time: '3 hours ago',
            type: 'success',
            icon: CheckCircle
          },
          { 
            title: 'Interview scheduled', 
            description: 'Interview with DataTech for Data Analyst role on Monday 10 AM',
            time: '1 day ago',
            type: 'success',
            icon: CheckCircle
          }
        ];
      
      case 'employer':
        return [
          { 
            title: 'New application received', 
            description: 'Michael Chen applied for Backend Developer position',
            time: '30 minutes ago',
            type: 'info',
            icon: AlertCircle
          },
          { 
            title: 'Candidate shortlisted', 
            description: 'Emma Wilson shortlisted for UI/UX Designer role',
            time: '2 hours ago',
            type: 'success',
            icon: CheckCircle
          },
          { 
            title: 'Job posting expires soon', 
            description: 'Frontend Developer position expires in 3 days',
            time: '5 hours ago',
            type: 'warning',
            icon: Clock
          }
        ];
      
      case 'placement_officer':
        return [
          { 
            title: 'Placement record updated', 
            description: 'Alex Kumar successfully placed at Google',
            time: '1 hour ago',
            type: 'success',
            icon: CheckCircle
          },
          { 
            title: 'Company verification completed', 
            description: 'Microsoft verified as recruitment partner',
            time: '4 hours ago',
            type: 'success',
            icon: CheckCircle
          },
          { 
            title: 'Bulk application deadline approaching', 
            description: 'Campus recruitment applications close in 2 days',
            time: '8 hours ago',
            type: 'warning',
            icon: Clock
          }
        ];
      
      default:
        return [];
    }
  };

  const activities = getActivitiesForRole();

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