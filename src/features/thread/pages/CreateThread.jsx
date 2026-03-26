import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createThread } from '../service/threadService';
import { getAllUsers } from '../../../features/project/services/userService';
import { ArrowLeft, Calendar, User, AlertCircle, Send, X } from 'lucide-react';

const CreateThread = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    priority: 3,
    assignUserId: '',
    dueDate: ''
  });
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);
      const response = await getAllUsers();
      console.log("Users:", response);
      
      if (response && response.success && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.topic.trim()) {
      setError('Topic is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.assignUserId) {
      setError('Please assign a user');
      return false;
    }
    if (!formData.dueDate) {
      setError('Please select a due date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const threadData = {
        topic: formData.topic.trim(),
        description: formData.description.trim(),
        priority: parseInt(formData.priority),
        assignUserId: parseInt(formData.assignUserId),
        dueDate: formData.dueDate
      };
      
      console.log("Creating thread with data:", threadData);
      
      const response = await createThread(projectId, threadData);
      console.log("Thread created:", response);
      
      if (response && response.success) {
        setSuccess(true);
        
        // Reset form
        setFormData({
          topic: '',
          description: '',
          priority: 3,
          assignUserId: '',
          dueDate: ''
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate(`/project/${projectId}`);
        }, 2000);
      } else {
        setError(response?.message || 'Failed to create thread');
      }
    } catch (err) {
      console.error("Error creating thread:", err);
      setError(err.response?.data?.message || 'Failed to create thread. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Priority options
  const priorityOptions = [
    { value: 1, label: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: '🔵' },
    { value: 2, label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🟡' },
    { value: 3, label: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🟠' },
    { value: 4, label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: '🔴' }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thread Created!</h2>
          <p className="text-gray-600 mb-4">Your thread has been successfully created.</p>
          <p className="text-sm text-gray-500">Redirecting to project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/project/${projectId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#002d74]">Create New Thread</h1>
              <p className="text-sm text-gray-500 mt-1">Project ID: #{projectId}</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#002d74] to-[#1691fd] px-6 py-4">
            <div className="flex items-center">
              <Send className="w-5 h-5 text-white mr-2" />
              <h2 className="text-lg font-semibold text-white">Thread Information</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Topic */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., Payment API bug, UI issue, Database error"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition"
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the issue in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition resize-y"
                disabled={loading}
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Priority <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {priorityOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => !loading && setFormData(prev => ({ ...prev, priority: option.value }))}
                    className={`
                      flex items-center justify-center space-x-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all
                      ${formData.priority === option.value 
                        ? `${option.bg} ${option.color} border-[#002d74] shadow-md` 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assign User */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Assign To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="assignUserId"
                  value={formData.assignUserId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition bg-white"
                  disabled={loading || fetchingUsers}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              {fetchingUsers && (
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#002d74] border-t-transparent mr-2"></div>
                  Loading users...
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/project/${projectId}`)}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2 bg-[#002d74] text-white rounded-lg font-medium hover:bg-[#001a4d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Thread
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            About Threads
          </h3>
          <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
            <li>Threads help track specific issues, tasks, or discussions within a project</li>
            <li>Each thread can be assigned to a team member with a priority level</li>
            <li>Set a due date to track deadlines for issue resolution</li>
            <li>Once created, threads can be viewed and managed from the project page</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateThread;