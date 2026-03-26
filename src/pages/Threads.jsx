// src/pages/Threads.jsx
import React, { useState, useEffect } from "react";
import { Icon } from "../components/ui/DashboardPrimitives";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to install axios: npm install axios

const Threads = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // If you need project-specific threads
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Get auth token from localStorage or context
  const getAuthToken = () => {
    return localStorage.getItem("accessToken"); // Adjust based on your auth implementation
  };

  // Fetch threads from API
  const fetchThreads = async (page = 1) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const url = projectId 
        ? `https://pms-l909.onrender.com/api/v1/projects/${projectId}/threads?sortBy=createdAt&order=desc&page=${page}&limit=${pagination.limit}`
        : `https://pms-l909.onrender.com/api/v1/threads?sortBy=createdAt&order=desc&page=${page}&limit=${pagination.limit}`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setThreads(response.data.data.data);
        setPagination({
          ...pagination,
          page: response.data.data.pagination.page,
          total: parseInt(response.data.data.pagination.total),
          totalPages: response.data.data.pagination.totalPages
        });
      }
    } catch (err) {
      console.error("Error fetching threads:", err);
      setError(err.response?.data?.message || "Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };

  // Fetch single thread details
  const fetchThreadDetails = async (threadId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`https://pms-l909.onrender.com/api/v1/threads/${threadId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setSelectedThread(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching thread details:", err);
      setError(err.response?.data?.message || "Failed to fetch thread details");
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [projectId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getPriorityInfo = (priority) => {
    const priorities = {
      1: { label: "Low", color: "#2ECC71", bg: "#2ECC7120" },
      2: { label: "Medium", color: "#F39C12", bg: "#F39C1220" },
      3: { label: "High", color: "#E74C3C", bg: "#E74C3C20" },
      4: { label: "Critical", color: "#C0392B", bg: "#C0392B20" }
    };
    return priorities[priority] || { label: "Unknown", color: "#95A5A6", bg: "#95A5A620" };
  };

  const getStatusInfo = (status) => {
    const statuses = {
      1: { label: "Open", color: "#4A90E2", bg: "#4A90E220" },
      2: { label: "In Progress", color: "#F39C12", bg: "#F39C1220" },
      3: { label: "Resolved", color: "#2ECC71", bg: "#2ECC7120" },
      4: { label: "Closed", color: "#95A5A6", bg: "#95A5A620" }
    };
    return statuses[status] || { label: "Unknown", color: "#95A5A6", bg: "#95A5A620" };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const token = getAuthToken();
      // This endpoint might need adjustment based on your API
      const response = await axios.post(
        `https://pms-l909.onrender.com/api/v1/threads/${selectedThread.id}/messages`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        // Refresh thread details to get new message
        await fetchThreadDetails(selectedThread.id);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  if (loading && threads.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div>Loading threads...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#f8f6f2"
    }}>
      <div style={{ 
        padding: "24px 32px",
        maxWidth: "1400px", 
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "32px"
        }}>
          <div>
            <h1 style={{ 
              fontSize: "32px", 
              fontWeight: "600", 
              color: "#1a1917",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <Icon type="thread" size={28} />
              Threads
            </h1>
            <p style={{ color: "#888780", marginTop: "8px", fontSize: "14px" }}>
              {projectId ? "Project discussions and threads" : "All conversations and project discussions"}
            </p>
          </div>
          <button
            onClick={() => navigate(`/threads/new${projectId ? `?projectId=${projectId}` : ''}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "#4A90E2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background 0.2s"
            }}
          >
            <Icon type="plus" size={16} />
            New Thread
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: "#fee",
            color: "#c33",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #fcc"
          }}>
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: "20px",
          marginBottom: "32px"
        }}>
          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px", 
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e8e6e0"
          }}>
            <div style={{ fontSize: "13px", color: "#888780", marginBottom: "8px", fontWeight: "500" }}>
              Total Threads
            </div>
            <div style={{ fontSize: "36px", fontWeight: "600", color: "#1a1917" }}>
              {pagination.total}
            </div>
          </div>
          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px", 
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e8e6e0"
          }}>
            <div style={{ fontSize: "13px", color: "#888780", marginBottom: "8px", fontWeight: "500" }}>
              Open Threads
            </div>
            <div style={{ fontSize: "36px", fontWeight: "600", color: "#4A90E2" }}>
              {threads.filter(t => t.threadStatus === 1).length}
            </div>
          </div>
          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px", 
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e8e6e0"
          }}>
            <div style={{ fontSize: "13px", color: "#888780", marginBottom: "8px", fontWeight: "500" }}>
              High Priority
            </div>
            <div style={{ fontSize: "36px", fontWeight: "600", color: "#E74C3C" }}>
              {threads.filter(t => t.priority >= 3).length}
            </div>
          </div>
        </div>

        {/* Threads List */}
        <div style={{ 
          background: "white", 
          borderRadius: "12px", 
          overflow: "hidden", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #e8e6e0"
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr 1fr 100px", 
            padding: "16px 20px", 
            background: "#faf8f4", 
            borderBottom: "1px solid #e8e6e0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#888780",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            <div>Thread</div>
            <div>Priority</div>
            <div>Due Date</div>
            <div>Status</div>
          </div>

          {threads.map((thread) => {
            const priority = getPriorityInfo(thread.priority);
            const status = getStatusInfo(thread.threadStatus);
            return (
              <div
                key={thread.id}
                onClick={() => fetchThreadDetails(thread.id)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 100px",
                  padding: "20px",
                  borderBottom: "1px solid #e8e6e0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: selectedThread?.id === thread.id ? "#fefbf5" : "white",
                }}
                onMouseEnter={(e) => {
                  if (selectedThread?.id !== thread.id) {
                    e.currentTarget.style.background = "#fefbf5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedThread?.id !== thread.id) {
                    e.currentTarget.style.background = "white";
                  }
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <Icon type="thread" size={18} style={{ color: "#4A90E2" }} />
                    <span style={{ fontWeight: "600", color: "#1a1917", fontSize: "16px" }}>
                      {thread.topic}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#888780", marginBottom: "12px", lineHeight: "1.4" }}>
                    {thread.description}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888780" }}>
                    Created: {formatDate(thread.createdAt)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{
                    background: priority.bg,
                    color: priority.color,
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}>
                    {priority.label}
                  </span>
                </div>
                <div style={{ color: "#555", fontSize: "14px", display: "flex", alignItems: "center" }}>
                  {thread.dueDate ? formatDate(thread.dueDate) : "No due date"}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                    background: status.bg,
                    color: status.color
                  }}>
                    {status.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
            padding: "20px"
          }}>
            <button
              onClick={() => fetchThreads(pagination.page - 1)}
              disabled={pagination.page === 1}
              style={{
                padding: "8px 12px",
                background: "white",
                border: "1px solid #e8e6e0",
                borderRadius: "6px",
                cursor: pagination.page === 1 ? "not-allowed" : "pointer",
                opacity: pagination.page === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>
            <span style={{ padding: "8px 12px", color: "#555" }}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchThreads(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              style={{
                padding: "8px 12px",
                background: "white",
                border: "1px solid #e8e6e0",
                borderRadius: "6px",
                cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer",
                opacity: pagination.page === pagination.totalPages ? 0.5 : 1
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Thread Detail Sidebar - Similar to before but with API data */}
      {selectedThread && (
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "480px",
          height: "100vh",
          background: "white",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Sidebar Header */}
          <div style={{
            padding: "24px",
            borderBottom: "1px solid #e8e6e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background: "#faf8f4"
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Icon type="thread" size={20} style={{ color: "#4A90E2" }} />
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1a1917" }}>
                  {selectedThread.topic}
                </h3>
              </div>
              <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  background: getPriorityInfo(selectedThread.priority).bg,
                  color: getPriorityInfo(selectedThread.priority).color,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px"
                }}>
                  Priority: {getPriorityInfo(selectedThread.priority).label}
                </span>
                {selectedThread.dueDate && (
                  <span style={{
                    background: "#e8e6e0",
                    color: "#555",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}>
                    Due: {formatDate(selectedThread.dueDate)}
                  </span>
                )}
              </div>
              <p style={{ margin: "12px 0 0", fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
                {selectedThread.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedThread(null)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#888780"
              }}
            >
              ×
            </button>
          </div>
          
          {/* Messages Area - You'll need to implement messages API */}
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "24px",
            textAlign: "center",
            color: "#888780"
          }}>
            <p>Messages feature coming soon</p>
            <p style={{ fontSize: "12px", marginTop: "8px" }}>
              Thread ID: {selectedThread.id}
            </p>
          </div>
          
          {/* Message Input */}
          <div style={{ 
            padding: "20px 24px", 
            borderTop: "1px solid #e8e6e0",
            background: "white"
          }}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e8e6e0",
                borderRadius: "8px",
                fontSize: "14px",
                resize: "vertical",
                fontFamily: "inherit",
                outline: "none"
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <button
                onClick={handleSendMessage}
                style={{
                  padding: "8px 20px",
                  background: "#4A90E2",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Threads;