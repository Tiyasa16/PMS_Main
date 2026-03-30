// src/features/task/pages/Tasks.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  GitBranch, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Loader,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  X,
  Plus
} from 'lucide-react';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Tasks', color: 'bg-gray-100 text-gray-700' },
    { value: 'TODO', label: 'To Do', color: 'bg-gray-100 text-gray-700' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    { value: 'DONE', label: 'Done', color: 'bg-green-100 text-green-700' },
    { value: 'BLOCKED', label: 'Blocked', color: 'bg-red-100 text-red-700' }
  ];

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, statusFilter, tasks]);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, get all threads
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://pms-l909.onrender.com/api/v1/threads/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      console.log('Threads response:', result);
      
      if (result && result.success) {
        const threads = result.data;
        
        // Fetch tasks for each thread (if your API supports it)
        // For now, we'll create mock tasks based on threads
        // Replace this with actual task fetching logic when you have a tasks API endpoint
        const mockTasks = [];
        
        threads.forEach(thread => {
          // Mock tasks - replace with actual API call to get tasks by thread
          mockTasks.push({
            id: thread.id * 10 + 1,
            title: `Complete ${thread.topic}`,
            description: `Work on ${thread.topic} for project ${thread.projectName}`,
            taskStatus: ['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED'][Math.floor(Math.random() * 4)],
            targetDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            gitLink: null,
            threadId: thread.id,
            threadTopic: thread.topic,
            projectName: thread.projectName,
            assignedTo: thread.assignedTo
          });
        });
        
        setTasks(mockTasks);
        setFilteredTasks(mockTasks);
      } else {
        setError('Failed to load tasks');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.taskStatus === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.threadTopic?.toLowerCase().includes(term) ||
        task.projectName?.toLowerCase().includes(term)
      );
    }
    
    setFilteredTasks(filtered);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    
    try {
      setDeleting(true);
      // Add your delete task API call here
      // await deleteTask(selectedTask.id);
      
      // Mock delete for now
      setTimeout(() => {
        const updatedTasks = tasks.filter(t => t.id !== selectedTask.id);
        setTasks(updatedTasks);
        setShowDeleteModal(false);
        setSelectedTask(null);
        setDeleting(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
      setDeleting(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Add your update task status API call here
      // await updateTask(taskId, { taskStatus: newStatus });
      
      // Optimistic update
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, taskStatus: newStatus } : task
      );
      setTasks(updatedTasks);
      
    } catch (err) {
      console.error('Error updating task status:', err);
      alert('Failed to update task status');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'TODO':
        return { label: 'To Do', color: 'bg-gray-100 text-gray-700', icon: '📋' };
      case 'IN_PROGRESS':
        return { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: '⚡' };
      case 'DONE':
        return { label: 'Done', color: 'bg-green-100 text-green-700', icon: '✅' };
      case 'BLOCKED':
        return { label: 'Blocked', color: 'bg-red-100 text-red-700', icon: '🔴' };
      default:
        return { label: status || 'Unknown', color: 'bg-gray-100 text-gray-700', icon: '📌' };
    }
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED'];
    return allStatuses.filter(s => s !== currentStatus);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusCount = (status) => {
    if (status === 'all') return tasks.length;
    return tasks.filter(t => t.taskStatus === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin rounded-full h-12 w-12 text-[#002d74] mx-auto mb-4" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#002d74]">Tasks</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track all your tasks across projects
              </p>
            </div>
            <button
              onClick={() => navigate('/threads')}
              className="inline-flex items-center px-4 py-2 bg-[#002d74] text-white rounded-lg hover:bg-[#001a4d] transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          {statusOptions.slice(1).map(option => (
            <div key={option.value} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{option.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {getStatusCount(option.value)}
                  </p>
                </div>
                <div className={`rounded-full p-3 ${option.color}`}>
                  <span className="text-lg">
                    {option.value === 'TODO' && '📋'}
                    {option.value === 'IN_PROGRESS' && '⚡'}
                    {option.value === 'DONE' && '✅'}
                    {option.value === 'BLOCKED' && '🔴'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks by title, description, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent"
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74]"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Tasks Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'No tasks match your filters. Try adjusting your search criteria.'
                : 'No tasks available. Create your first task to get started.'}
            </p>
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const status = getStatusBadge(task.taskStatus);
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-[#002d74]">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {task.projectName}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Target: {formatDate(task.targetDate)}
                        </span>
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          Assigned to: User #{task.assignedTo}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Created: {formatDate(task.createdAt)}
                        </span>
                        {task.gitLink && (
                          <a
                            href={task.gitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <GitBranch className="w-3 h-3 mr-1" />
                            View PR/Commit
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {/* Status Dropdown */}
                      {task.taskStatus !== 'DONE' && (
                        <select
                          value={task.taskStatus}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50 transition"
                        >
                          <option value={task.taskStatus} disabled>
                            {status.label}
                          </option>
                          {getStatusOptions(task.taskStatus).map(option => {
                            const optionStatus = getStatusBadge(option);
                            return (
                              <option key={option} value={option}>
                                Move to {optionStatus.label}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      
                      <button
                        onClick={() => navigate(`/thread/${task.threadId}`)}
                        className="p-1.5 hover:bg-gray-100 rounded transition text-gray-500"
                        title="View Thread"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => navigate(`/threads/${task.threadId}/tasks/${task.id}/edit`)}
                        className="p-1.5 hover:bg-gray-100 rounded transition text-gray-500"
                        title="Edit Task"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 hover:bg-red-100 rounded transition text-red-500"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Delete Task</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={deleting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600">
                  Are you sure you want to delete task <span className="font-semibold text-gray-800">"{selectedTask.title}"</span>?
                </p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTask}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 flex items-center"
                >
                  {deleting ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Deleting...
                    </>
                  ) : (
                    'Yes, Delete Task'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;