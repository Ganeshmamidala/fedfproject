import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const { userProfile } = useAuth();

  // Mock data - in real app, this would come from API
  const getStatsForRole = () => {
    switch (userProfile?.role) {
      case 'admin':
        return [
          { title: 'Total Users', value: '1,248', icon: Users, color: 'bg-blue-500' },
          { title: 'Active Jobs', value: '89', icon: Briefcase, color: 'bg-green-500' },
          { title: 'Applications', value: '3,421', icon: FileText, color: 'bg-purple-500' },
          { title: 'Placements', value: '156', icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      case 'student':
        return [
          { title: 'Available Jobs', value: '89', icon: Briefcase, color: 'bg-blue-500' },
          { title: 'My Applications', value: '12', icon: FileText, color: 'bg-green-500' },
          { title: 'Interviews', value: '3', icon: Users, color: 'bg-purple-500' },
          { title: 'Profile Views', value: '47', icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      case 'employer':
        return [
          { title: 'Posted Jobs', value: '8', icon: Briefcase, color: 'bg-blue-500' },
          { title: 'Applications Received', value: '234', icon: FileText, color: 'bg-green-500' },
          { title: 'Candidates Shortlisted', value: '45', icon: Users, color: 'bg-purple-500' },
          { title: 'Successful Hires', value: '12', icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      case 'placement_officer':
        return [
          { title: 'Students Placed', value: '156', icon: Users, color: 'bg-blue-500' },
          { title: 'Active Companies', value: '34', icon: Briefcase, color: 'bg-green-500' },
          { title: 'Ongoing Applications', value: '421', icon: FileText, color: 'bg-purple-500' },
          { title: 'Placement Rate', value: '78%', icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;