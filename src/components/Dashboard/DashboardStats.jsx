import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { getStatistics } from '../../lib/mockData';

const DashboardStats = () => {
  const { user, userProfile } = useAuth();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    if (user && userProfile) {
      const stats = getStatistics(user.id, userProfile.role);
      setStatistics(stats);
    }
  }, [user, userProfile]);

  const getStatsForRole = () => {
    switch (userProfile?.role) {
      case 'admin':
        return [
          { title: 'Total Users', value: statistics.totalUsers || 0, icon: Users, color: 'bg-blue-500' },
          { title: 'Active Jobs', value: statistics.activeJobs || 0, icon: Briefcase, color: 'bg-green-500' },
          { title: 'Applications', value: statistics.totalApplications || 0, icon: FileText, color: 'bg-purple-500' },
          { title: 'Placements', value: statistics.totalPlacements || 0, icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      case 'student':
        return [
          { title: 'Available Jobs', value: statistics.availableJobs || 0, icon: Briefcase, color: 'bg-blue-500' },
          { title: 'My Applications', value: statistics.myApplications || 0, icon: FileText, color: 'bg-green-500' },
          { title: 'Interviews', value: statistics.interviews || 0, icon: Users, color: 'bg-purple-500' },
          { title: 'Placements', value: statistics.placements || 0, icon: TrendingUp, color: 'bg-orange-500' }
        ];
      
      case 'employer':
        return [
          { title: 'Posted Jobs', value: statistics.postedJobs || 0, icon: Briefcase, color: 'bg-blue-500' },
          { title: 'Active Jobs', value: statistics.activeJobs || 0, icon: Briefcase, color: 'bg-green-500' },
          { title: 'Applications Received', value: statistics.applicationsReceived || 0, icon: FileText, color: 'bg-purple-500' },
          { title: 'Interviews', value: statistics.interviews || 0, icon: Users, color: 'bg-orange-500' }
        ];
      
      case 'placement_officer':
        return [
          { title: 'Total Students', value: statistics.totalStudents || 0, icon: Users, color: 'bg-blue-500' },
          { title: 'Placed Students', value: statistics.placedStudents || 0, icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Active Jobs', value: statistics.activeJobs || 0, icon: Briefcase, color: 'bg-purple-500' },
          { title: 'Placement Rate', value: `${statistics.placementRate || 0}%`, icon: TrendingUp, color: 'bg-orange-500' }
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