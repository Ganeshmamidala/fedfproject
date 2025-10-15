import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, User, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';



const InterviewSchedulingView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [viewMode, setViewMode] = useState('calendar');

  const interviews = [
    {
      id: '1',
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      candidate: 'John Doe',
      candidateEmail: 'john@example.com',
      date: new Date(2024, 2, 15, 10, 0),
      time: '10:00 AM',
      duration: 60,
      type: 'video',
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      notes: 'Technical interview focusing on React and Node.js'
    },
    {
      id: '2',
      jobTitle: 'Data Analyst',
      company: 'Analytics Pro',
      candidate: 'Jane Smith',
      candidateEmail: 'jane@example.com',
      date: new Date(2024, 2, 16, 14, 0),
      time: '2:00 PM',
      duration: 45,
      type: 'in-person',
      status: 'scheduled',
      location: '123 Business Ave, Suite 400',
      notes: 'Bring portfolio and data analysis examples'
    },
    {
      id: '3',
      jobTitle: 'Marketing Manager',
      company: 'Creative Agency',
      candidate: 'Mike Johnson',
      candidateEmail: 'mike@example.com',
      date: new Date(2024, 2, 14, 11, 0),
      time: '11:00 AM',
      duration: 30,
      type: 'phone',
      status: 'completed',
      notes: 'Initial screening call completed successfully'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'rescheduled': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      case 'phone': return <Clock className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Interview</h2>
          <button
            onClick={() => setShowScheduleModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option>Software Engineer</option>
                <option>Data Analyst</option>
                <option>Marketing Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Candidate</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option value="video">Video Call</option>
                <option value="in-person">In Person</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location/Meeting Link</label>
            <input
              type="text"
              placeholder="Enter meeting link or address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              placeholder="Add any additional notes or instructions"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Scheduling
            </h1>
            <p className="text-gray-600 mt-2">Manage and schedule interviews with candidates</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <User className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-purple-600">5</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Interview List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Interviews</h2>
          </div>
          <div className="divide-y divide-gray-200/30">
            {interviews.map((interview) => (
              <div key={interview.id} className="p-6 hover:bg-blue-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                      {getTypeIcon(interview.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{interview.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          <User className="w-4 h-4 inline mr-1" />
                          {interview.candidate}
                        </span>
                        <span className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {interview.date.toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {interview.time} ({interview.duration}min)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {interview.notes && (
                  <div className="mt-3 p-3 bg-gray-50/50 rounded-lg">
                    <p className="text-sm text-gray-600">{interview.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showScheduleModal && <ScheduleModal />}
    </div>
  );
};

export default InterviewSchedulingView;