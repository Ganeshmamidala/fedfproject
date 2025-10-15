import React, { useState } from 'react';
import { Building, MapPin, Globe, Phone, Mail, Users, Calendar, Save, CreditCard as Edit3, Upload, Star } from 'lucide-react';

const CompanyProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    description: 'We are a leading technology company focused on innovative software solutions. Our mission is to transform businesses through cutting-edge technology and exceptional talent.',
    website: 'https://techcorp.com',
    email: 'hr@techcorp.com',
    phone: '+1-555-0123',
    address: '123 Tech Street, San Francisco, CA 94105',
    foundedYear: 2015,
    employeeCount: '500-1000',
    benefits: [
      'Health Insurance',
      'Dental & Vision',
      '401(k) Matching',
      'Flexible Work Hours',
      'Remote Work Options',
      'Professional Development',
      'Stock Options',
      'Paid Time Off'
    ],
    culture: 'We foster an inclusive, collaborative environment where innovation thrives. Our team values work-life balance, continuous learning, and making a positive impact through technology.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      facebook: 'https://facebook.com/techcorp'
    }
  });

  const [newBenefit, setNewBenefit] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform) => {
    setCompanyData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !companyData.benefits.includes(newBenefit.trim())) {
      setCompanyData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefitToRemove) => {
    setCompanyData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit !== benefitToRemove)
    }));
  };

  const handleSave = () => {
    console.log('Saving company profile:', companyData);
    setIsEditing(false);
  };

  const companyStats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 234,
    hiredCandidates: 15
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            <p className="mt-2 text-gray-600">Manage your company information and showcase your brand</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {companyData.companyName.split(' ').map(n => n[0]).join('')}
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
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleInputChange}
                    className="text-xl font-semibold text-gray-900 text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900">{companyData.companyName}</h2>
                )}
                
                <p className="text-gray-600 mt-1">{companyData.industry}</p>
                <p className="text-sm text-gray-500">Founded {companyData.foundedYear}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={companyData.email}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{companyData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={companyData.phone}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{companyData.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={companyData.website}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {companyData.website}
                    </a>
                  )}
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5" />
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent resize-none"
                    />
                  ) : (
                    <span>{companyData.address}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-3" />
                  {isEditing ? (
                    <select
                      name="employeeCount"
                      value={companyData.employeeCount}
                      onChange={handleInputChange}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500-1000">500-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  ) : (
                    <span>{companyData.employeeCount} employees</span>
                  )}
                </div>
              </div>

              {/* Company Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recruitment Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{companyStats.activeJobs}</div>
                    <div className="text-xs text-gray-600">Active Jobs</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{companyStats.totalApplications}</div>
                    <div className="text-xs text-gray-600">Applications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Description */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Company</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={companyData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your company..."
                />
              ) : (
                <p className="text-gray-600">{companyData.description}</p>
              )}
            </div>

            {/* Company Culture */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Culture</h3>
              {isEditing ? (
                <textarea
                  name="culture"
                  value={companyData.culture}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your company culture..."
                />
              ) : (
                <p className="text-gray-600">{companyData.culture}</p>
              )}
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {companyData.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200"
                  >
                    {benefit}
                    {isEditing && (
                      <button
                        onClick={() => removeBenefit(benefit)}
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
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a benefit"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                  />
                  <button
                    onClick={addBenefit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-20 text-sm text-gray-600">LinkedIn:</span>
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyData.socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  ) : (
                    <a href={companyData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {companyData.socialLinks.linkedin}
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-20 text-sm text-gray-600">Twitter:</span>
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyData.socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://twitter.com/yourcompany"
                    />
                  ) : (
                    <a href={companyData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {companyData.socialLinks.twitter}
                    </a>
                  )}
                </div>
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
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileView;