import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, FolderOpen, Star, Share2, BarChart3, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDocuments, addDocument, deleteDocument as deleteDoc, toggleFavorite as toggleFav, getJobs } from '../../lib/mockData';
import DragDropUpload from '../../components/Common/DragDropUpload';
import Toast from '../../components/Common/Toast';
import { useToast } from '../../hooks/useToast';
import ExportButton from '../../components/Common/ExportButton';

const DocumentManagementView = () => {
  const { user } = useAuth();
  const { toasts, success, error, removeToast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    type: 'resume',
    tags: '',
    isPublic: false,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user, selectedType]);

  const loadDocuments = () => {
    const docs = getDocuments({ userId: user.id, type: selectedType });
    setDocuments(docs);
  };

  const validateFiles = (files) => {
    const errors = [];
    const maxSizeMB = 20;
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'];

    files.forEach(file => {
      const sizeMB = file.size / (1024 * 1024);
      const extension = file.name.split('.').pop().toLowerCase();

      if (sizeMB > maxSizeMB) {
        errors.push(`${file.name} exceeds ${maxSizeMB}MB limit`);
      }

      if (!allowedTypes.includes(extension)) {
        errors.push(`${file.name} has unsupported file type`);
      }
    });

    return errors;
  };

  const analyzeResume = (file, documentTags = '') => {
    try {
      // Extract skills from resume filename and tags
      const fileName = file.name.toLowerCase();
      const tags = (documentTags || uploadData.tags || '').toLowerCase();
      
      // Common skills to detect
      const skillsDatabase = [
        'react', 'javascript', 'python', 'java', 'node', 'sql', 'mongodb',
        'aws', 'docker', 'kubernetes', 'git', 'html', 'css', 'angular',
        'vue', 'typescript', 'express', 'django', 'flask', 'spring',
        'machine learning', 'ai', 'data science', 'analytics', 'testing',
        'agile', 'scrum', 'devops', 'ci/cd', 'rest api', 'graphql'
      ];
      
      const detectedSkills = skillsDatabase.filter(skill => 
        fileName.includes(skill) || tags.includes(skill)
      );
      
      // If no skills detected from filename, use some default skills
      if (detectedSkills.length === 0) {
        detectedSkills.push('javascript', 'react', 'node', 'sql', 'git');
      }
      
      // Get all available jobs
      const allJobs = getJobs() || [];
      
      // Match jobs based on skills
      const jobMatches = [];
      const categoryMatches = {};
      
      allJobs.forEach(job => {
        const jobSkills = (job.requirements || job.title || '').toLowerCase();
        let matchCount = 0;
        
        detectedSkills.forEach(skill => {
          if (jobSkills.includes(skill)) {
            matchCount++;
          }
        });
        
        if (matchCount > 0) {
          jobMatches.push({ ...job, matchScore: matchCount });
          
          const category = job.type || 'Other';
          categoryMatches[category] = (categoryMatches[category] || 0) + 1;
        }
      });
      
      // Sort by match score
      jobMatches.sort((a, b) => b.matchScore - a.matchScore);
      
      return {
        skills: detectedSkills,
        totalJobs: jobMatches.length,
        matchedJobs: jobMatches.slice(0, 10),
        categoryBreakdown: categoryMatches,
        totalAvailableJobs: allJobs.length
      };
    } catch (err) {
      console.error('Error analyzing resume:', err);
      return {
        skills: ['javascript', 'react', 'node'],
        totalJobs: 0,
        matchedJobs: [],
        categoryBreakdown: {},
        totalAvailableJobs: 0
      };
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      error('Please select at least one file');
      return;
    }

    const validationErrors = validateFiles(selectedFiles);
    if (validationErrors.length > 0) {
      error(validationErrors[0]);
      return;
    }

    if (!uploadData.type) {
      error('Please select a document type');
      return;
    }

    try {
      // Simulate async upload
      await new Promise(resolve => setTimeout(resolve, 500));

      selectedFiles.forEach(file => {
        const newDoc = addDocument({
          userId: user.id,
          name: file.name,
          type: uploadData.type,
          size: (file.size / 1024).toFixed(2) + 'KB',
          tags: uploadData.tags.split(',').map(t => t.trim()).filter(t => t),
          isPublic: uploadData.isPublic
        });

        setDocuments(prev => [newDoc, ...prev]);
        
        // Analyze resume if it's a resume type
        if (uploadData.type === 'resume') {
          const analysis = analyzeResume(file);
          setAnalysisData(analysis);
          setShowAnalysis(true);
        }
      });

      success(`${selectedFiles.length} file(s) uploaded successfully!`);
      setShowUploadModal(false);
      setUploadData({ type: 'resume', tags: '', isPublic: false });
      setSelectedFiles([]);
    } catch (err) {
      error('Failed to upload documents. Please try again.');
    }
  };

  const handleDelete = async (docId) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      deleteDoc(docId);
      setDocuments(prev => prev.filter(d => d.id !== docId));
      success('Document deleted successfully');
    } catch (err) {
      error('Failed to delete document. Please try again.');
    }
  };

  const handleToggleFavorite = async (docId) => {
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 200));
      
      toggleFav(docId);
      setDocuments(prev => prev.map(d =>
        d.id === docId ? { ...d, isFavorite: !d.isFavorite } : d
      ));
      success('Favorite status updated');
    } catch (err) {
      error('Failed to update favorite status');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'resume': return '📄';
      case 'cover-letter': return '📝';
      case 'certificate': return '🏆';
      case 'transcript': return '📊';
      case 'portfolio': return '💼';
      default: return '📁';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'resume': return 'bg-blue-100 text-blue-800';
      case 'cover-letter': return 'bg-green-100 text-green-800';
      case 'certificate': return 'bg-yellow-100 text-yellow-800';
      case 'transcript': return 'bg-cyan-100 text-cyan-800';
      case 'portfolio': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  // Prepare export data
  const getExportData = () => {
    return filteredDocuments.map(doc => ({
      Name: doc.name,
      Type: doc.type,
      Size: doc.size,
      Tags: doc.tags.join(', '),
      'Upload Date': new Date(doc.uploadedAt).toLocaleDateString(),
      Visibility: doc.isPublic ? 'Public' : 'Private',
      Downloads: doc.downloads || 0,
    }));
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
          <button
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Drag & Drop Component */}
        <div className="mb-6">
          <DragDropUpload 
            onFilesSelected={handleFilesSelected}
            maxFiles={10}
            maxSizeMB={20}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select
              value={uploadData.type}
              onChange={(e) => setUploadData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="resume">Resume</option>
              <option value="cover-letter">Cover Letter</option>
              <option value="certificate">Certificate</option>
              <option value="transcript">Transcript</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
              {uploadData.type === 'resume' && (
                <span className="ml-2 text-xs text-blue-600 font-normal">
                  💡 Add your skills for better job matching!
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="e.g., software-engineer, react, nodejs"
              value={uploadData.tags}
              onChange={(e) => setUploadData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {uploadData.type === 'resume' && (
              <p className="text-xs text-gray-500 mt-1">
                Your resume will be analyzed to find matching jobs based on these skills
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="public"
              checked={uploadData.isPublic}
              onChange={(e) => setUploadData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="public" className="text-sm text-gray-700">Make these documents public</label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => {
              setShowUploadModal(false);
              setSelectedFiles([]);
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Document Management
            </h1>
            <p className="text-gray-600 mt-2">Manage and organize your documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                <p className="text-sm text-gray-600">My Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
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
                <p className="text-2xl font-bold text-green-600">{documents.filter(d => d.isPublic).length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-cyan-600">{documents.filter(d => d.isFavorite).length}</p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-xl">
                <Star className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-orange-600">{documents.reduce((sum, d) => sum + (d.downloadCount || 0), 0)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
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
              
              {/* Export Button */}
              <ExportButton 
                data={getExportData()}
                filename={`documents-${selectedType}-${new Date().toLocaleDateString()}`}
                format="csv"
                className="px-4 py-3"
              />
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">Upload your first document to get started</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
              >
                Upload Document
              </button>
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div key={document.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-2xl">{getTypeIcon(document.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{document.name}</h3>
                      <p className="text-sm text-gray-600">{document.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(document.id)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors flex-shrink-0"
                  >
                    <Star className={`w-5 h-5 ${document.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(document.type)}`}>
                    {document.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </span>
                </div>

                {document.tags && document.tags.length > 0 && (
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
                )}

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className={document.isPublic ? 'text-green-600' : 'text-gray-500'}>
                    {document.isPublic ? 'Public' : 'Private'}
                  </span>
                  <span>{document.downloadCount || 0} downloads</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {document.type === 'resume' && (
                      <button 
                        onClick={() => {
                          const mockFile = { name: document.name, size: 1024 };
                          const documentTagsString = Array.isArray(document.tags) ? document.tags.join(', ') : '';
                          const analysis = analyzeResume(mockFile, documentTagsString);
                          setAnalysisData(analysis);
                          setShowAnalysis(true);
                        }}
                        className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                        title="Analyze resume for job matches"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setPreviewDocument(document);
                        setShowPreview(true);
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        success(`Downloading ${document.name}...`);
                        const link = document.createElement('a');
                        link.href = '#';
                        link.download = document.name;
                        link.click();
                      }}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href + '/document/' + document.id);
                        success('Share link copied to clipboard!');
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Share document"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showUploadModal && <UploadModal />}
      
      {/* Resume Analysis Modal */}
      {showAnalysis && analysisData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Resume Analysis</h2>
                    <p className="text-blue-100 text-sm">AI-powered job matching results</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Applicable Jobs</p>
                      <p className="text-3xl font-bold text-green-700">{analysisData.totalJobs}</p>
                    </div>
                    <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Skills Detected</p>
                      <p className="text-3xl font-bold text-blue-700">{analysisData.skills.length}</p>
                    </div>
                    <FileText className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border-2 border-cyan-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-600 text-sm font-medium">Match Rate</p>
                      <p className="text-3xl font-bold text-cyan-700">
                        {Math.round((analysisData.totalJobs / analysisData.totalAvailableJobs) * 100)}%
                      </p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-cyan-500 opacity-20" />
                  </div>
                </div>
              </div>

              {/* Detected Skills */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-lg px-2 py-1 text-sm mr-2">
                    Skills
                  </span>
                  Detected from Resume
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bar Graph - Job Categories */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Jobs by Category
                </h3>
                <div className="space-y-3">
                  {Object.entries(analysisData.categoryBreakdown).map(([category, count], index) => {
                    const maxCount = Math.max(...Object.values(analysisData.categoryBreakdown));
                    const percentage = (count / maxCount) * 100;
                    const colors = [
                      'bg-blue-500',
                      'bg-green-500',
                      'bg-cyan-500',
                      'bg-orange-500',
                      'bg-blue-500',
                      'bg-cyan-500'
                    ];
                    
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-gray-700">{category}</span>
                          <span className="text-gray-600">{count} jobs</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className={`${colors[index % colors.length]} h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500 ease-out`}
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-white text-xs font-bold">
                              {count}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Matched Jobs */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Matched Jobs
                </h3>
                <div className="space-y-3">
                  {analysisData.matchedJobs.slice(0, 5).map((job, index) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Match Score</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < job.matchScore ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {job.matchScore} skills
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowAnalysis(false);
                    // Navigate to browse jobs if available
                    success('Redirecting to job listings...');
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors font-medium shadow-lg"
                >
                  View All Jobs →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Preview Modal */}
      {showPreview && previewDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-6 h-6" />
                  <div>
                    <h2 className="text-xl font-bold">{previewDocument.name}</h2>
                    <p className="text-blue-100 text-sm mt-1">
                      {previewDocument.type.replace('-', ' ').toUpperCase()} • {previewDocument.size}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Info */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-semibold text-gray-900">{previewDocument.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-500">Size</p>
                  <p className="font-semibold text-gray-900">{previewDocument.size}</p>
                </div>
                <div>
                  <p className="text-gray-500">Uploaded</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(previewDocument.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className={`font-semibold ${previewDocument.isPublic ? 'text-green-600' : 'text-gray-600'}`}>
                    {previewDocument.isPublic ? 'Public' : 'Private'}
                  </p>
                </div>
              </div>
              
              {previewDocument.tags && previewDocument.tags.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-500 text-sm mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {previewDocument.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-8 bg-gray-50">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-200">
                {previewDocument.type === 'resume' && (
                  <div className="space-y-6">
                    <div className="text-center border-b pb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
                      <p className="text-gray-600">Software Developer</p>
                      <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
                        <span>📧 john.doe@email.com</span>
                        <span>📱 +91 98765 43210</span>
                        <span>📍 Bangalore, India</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
                      <p className="text-gray-700 leading-relaxed">
                        Experienced software developer with 3+ years of expertise in full-stack development.
                        Proficient in React, Node.js, and modern web technologies. Strong problem-solving skills
                        and passion for creating efficient, scalable applications.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {previewDocument.tags && previewDocument.tags.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Experience</h2>
                      <div className="space-y-4">
                        <div className="border-l-2 border-blue-500 pl-4">
                          <h3 className="font-semibold text-gray-900">Software Developer</h3>
                          <p className="text-sm text-gray-600">Tech Corp • 2022 - Present</p>
                          <p className="text-gray-700 mt-2">Developed and maintained web applications using React and Node.js</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h3 className="font-semibold text-gray-900">Bachelor of Technology</h3>
                        <p className="text-sm text-gray-600">Computer Science • 2019 - 2023</p>
                      </div>
                    </div>
                  </div>
                )}

                {previewDocument.type === 'cover-letter' && (
                  <div className="space-y-6">
                    <div className="text-right text-sm text-gray-600">
                      {new Date(previewDocument.uploadDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-700">Dear Hiring Manager,</p>
                      <p className="text-gray-700 leading-relaxed">
                        I am writing to express my strong interest in the Software Engineer position at your company.
                        With my background in full-stack development and passion for creating innovative solutions,
                        I am confident I would be a valuable addition to your team.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        My experience includes developing scalable web applications using React, Node.js, and modern
                        development practices. I am particularly excited about the opportunity to contribute to your
                        company's mission and work with cutting-edge technologies.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Thank you for considering my application. I look forward to discussing how my skills and
                        experience align with your team's needs.
                      </p>
                      <p className="text-gray-700">
                        Sincerely,<br />
                        John Doe
                      </p>
                    </div>
                  </div>
                )}

                {previewDocument.type === 'certificate' && (
                  <div className="text-center space-y-6 py-8">
                    <div className="text-6xl">🏆</div>
                    <h1 className="text-3xl font-bold text-gray-900">Certificate of Completion</h1>
                    <p className="text-xl text-gray-700">This is to certify that</p>
                    <h2 className="text-4xl font-bold text-blue-600">John Doe</h2>
                    <p className="text-lg text-gray-700">has successfully completed</p>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {previewDocument.tags && previewDocument.tags[0] ? 
                        previewDocument.tags[0].toUpperCase() + ' Certification' : 
                        'Professional Certification'}
                    </h3>
                    <div className="mt-8 pt-8 border-t border-gray-300">
                      <p className="text-sm text-gray-600">
                        Issued on {new Date(previewDocument.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {!['resume', 'cover-letter', 'certificate'].includes(previewDocument.type) && (
                  <div className="text-center py-12">
                    <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Document Preview</h3>
                    <p className="text-gray-500">
                      {previewDocument.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Preview available for resume, cover letter, and certificate types
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Download className="w-4 h-4" />
                <span>{previewDocument.downloadCount || 0} downloads</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    success(`Downloading ${previewDocument.name}...`);
                    setShowPreview(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default DocumentManagementView;