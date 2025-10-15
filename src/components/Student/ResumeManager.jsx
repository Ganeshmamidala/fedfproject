import React, { useState } from 'react';
import { Upload, File, Trash2, Download, Eye, Plus, Check } from 'lucide-react';



const ResumeManager = () => {
  const [resumes, setResumes] = useState([
    {
      id: '1',
      name: 'Resume_Software_Engineer.pdf',
      uploadedAt: '2024-01-15',
      size: '245 KB',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Resume_Data_Analyst.pdf',
      uploadedAt: '2024-01-10',
      size: '198 KB',
      isDefault: false,
    },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.endsWith('.doc') && !file.name.endsWith('.docx')) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newResume = {
        id: Date.now().toString(),
        name: file.name,
        uploadedAt: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        isDefault: resumes.length === 0,
      };

      setResumes([...resumes, newResume]);
      setUploading(false);

      // Show success message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Resume uploaded successfully!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }, 1500);

    // Reset input
    event.target.value = '';
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setResumes(resumes.map(r => ({
      ...r,
      isDefault: r.id === id,
    })));
  };

  const handleDownload = (resume) => {
    // In a real app, this would download the file from the server
    console.log(`Downloading ${resume.name}`);
  };

  const handlePreview = (resume) => {
    // In a real app, this would open a preview modal or new tab
    console.log(`Previewing ${resume.name}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume Manager</h2>
        <p className="text-sm text-gray-600">
          Upload and manage multiple versions of your resume. Choose different resumes for different job applications.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <label
          htmlFor="resume-upload"
          className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            uploading
              ? 'border-blue-300 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        >
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-700 font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PDF, DOC, or DOCX (Max. 5MB)
                </p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Resume List */}
      <div className="space-y-3">
        {resumes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <File className="w-16 h-16 mx-auto mb-2 text-gray-300" />
            <p>No resumes uploaded yet</p>
          </div>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                resume.isDefault
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center flex-1">
                <div className="mr-4">
                  <File className={`w-10 h-10 ${resume.isDefault ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{resume.name}</h3>
                    {resume.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        <Check className="w-3 h-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{resume.size}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                {!resume.isDefault && (
                  <button
                    onClick={() => handleSetDefault(resume.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Set as Default"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handlePreview(resume)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(resume)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Pro Tips
        </h4>
        <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
          <li>Create different resume versions tailored to specific job roles</li>
          <li>Keep your resume up-to-date with latest skills and experiences</li>
          <li>Use a clear filename that includes your name and target role</li>
          <li>Set your most versatile resume as default</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeManager;
