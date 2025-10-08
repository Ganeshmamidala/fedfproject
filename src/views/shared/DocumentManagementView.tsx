import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, FolderOpen, Star, Share2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'certificate' | 'transcript' | 'portfolio' | 'other';
  size: string;
  uploadDate: Date;
  owner: string;
  ownerRole: 'student' | 'employer' | 'admin';
  isPublic: boolean;
  isFavorite: boolean;
  downloadCount: number;
  tags: string[];
}

const DocumentManagementView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const documents: Document[] = [
    {
      id: '1',
      name: 'John_Doe_Resume_2024.pdf',
      type: 'resume',
      size: '245 KB',
      uploadDate: new Date(2024, 2, 10),
      owner: 'John Doe',
      ownerRole: 'student',
      isPublic: true,
      isFavorite: true,
      downloadCount: 15,
      tags: ['software-engineer', 'react', 'nodejs']
    },
    {
      id: '2',
      name: 'Cover_Letter_TechCorp.pdf',
      type: 'cover-letter',
      size: '180 KB',
      uploadDate: new Date(2024, 2, 12),
      owner: 'Jane Smith',
      ownerRole: 'student',
      isPublic: false,
      isFavorite: false,
      downloadCount: 3,
      tags: ['data-analyst', 'python', 'sql']
    },
    {
      id: '3',
      name: 'AWS_Certification.pdf',
      type: 'certificate',
      size: '1.2 MB',
      uploadDate: new Date(2024, 2, 8),
      owner: 'Mike Johnson',
      ownerRole: 'student',
      isPublic: true,
      isFavorite: true,
      downloadCount: 28,
      tags: ['aws', 'cloud', 'certification']
    },
    {
      id: '4',
      name: 'Academic_Transcript.pdf',
      type: 'transcript',
      size: '320 KB',
      uploadDate: new Date(2024, 2, 5),
      owner: 'Sarah Wilson',
      ownerRole: 'student',
      isPublic: false,
      isFavorite: false,
      downloadCount: 1,
      tags: ['academic', 'grades', 'computer-science']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume': return '📄';
      case 'cover-letter': return '📝';
      case 'certificate': return '🏆';
      case 'transcript': return '📊';
      case 'portfolio': return '💼';
      default: return '📁';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'resume': return 'bg-blue-100 text-blue-800';
      case 'cover-letter': return 'bg-green-100 text-green-800';
      case 'certificate': return 'bg-yellow-100 text-yellow-800';
      case 'transcript': return 'bg-purple-100 text-purple-800';
      case 'portfolio': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
          <button
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here or click to upload</h3>
          <p className="text-gray-600 mb-4">Support for PDF, DOC, DOCX files up to 10MB</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
            Choose Files
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value="resume">Resume</option>
              <option value="cover-letter">Cover Letter</option>
              <option value="certificate">Certificate</option>
              <option value="transcript">Transcript</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., software-engineer, react, nodejs"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="public" className="mr-2" />
            <label htmlFor="public" className="text-sm text-gray-700">Make this document public</label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setShowUploadModal(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Document Management
            </h1>
            <p className="text-gray-600 mt-2">Manage and organize your documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Public Documents</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-purple-600">1,247</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-orange-600">2.4 GB</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <FolderOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
              >
                <option value="all">All Types</option>
                <option value="resume">Resume</option>
                <option value="cover-letter">Cover Letter</option>
                <option value="certificate">Certificate</option>
                <option value="transcript">Transcript</option>
                <option value="portfolio">Portfolio</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(document.type)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{document.name}</h3>
                    <p className="text-sm text-gray-600">{document.size}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Star className={`w-5 h-5 ${document.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(document.type)}`}>
                  {document.type.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {document.uploadDate.toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {document.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
                    {tag}
                  </span>
                ))}
                {document.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    +{document.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>By {document.owner}</span>
                <span>{document.downloadCount} downloads</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUploadModal && <UploadModal />}
    </div>
  );
};

export default DocumentManagementView;