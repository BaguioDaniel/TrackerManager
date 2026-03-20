import React, { useState, useEffect } from 'react';
import logger from '../services/logger';
import { LOG_EVENTS } from '../utils/constants';
import CreateTaskModal from './create-task-modal';
import '../styles/tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchUserTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter, priorityFilter]);

  const fetchUserTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5259/api/tasks/user/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks || []);
        logger.log(LOG_EVENTS.TASKS_RENDER, {
          taskCount: data.tasks?.length || 0,
          tasks: data.tasks
        });
      } else {
        setError(data.message || 'Failed to load tasks');
      }
    } catch (err) {
      setError(err.message);
      logger.error('Error fetching tasks', { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = tasks;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleTaskCreated = (newTask) => {
    // Add the new task to the list
    setTasks(prev => [newTask, ...prev]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ToDo':
        return '#999';
      case 'InProgress':
        return '#667eea';
      case 'Completed':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return '#4caf50';
      case 'Medium':
        return '#ff9800';
      case 'High':
        return '#f44336';
      case 'Critical':
        return '#9c27b0';
      default:
        return '#999';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="tasks-page">
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <p>Manage and track all your assigned tasks</p>
      </div>

      <div className="tasks-toolbar">
        <button className="create-task-btn" onClick={() => setIsModalOpen(true)}>
          ✚ Create New Task
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={fetchUserTasks} className="retry-btn">Retry</button>
        </div>
      )}

      <div className="tasks-container">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Filter by Status</h3>
            <div className="filter-options">
              {['All', 'ToDo', 'InProgress', 'Completed'].map(status => (
                <label key={status} className="filter-label">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={statusFilter === status}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  <span>{status === 'InProgress' ? 'In Progress' : status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Filter by Priority</h3>
            <div className="filter-options">
              {['All', 'Low', 'Medium', 'High', 'Critical'].map(priority => (
                <label key={priority} className="filter-label">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={priorityFilter === priority}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  />
                  <span>{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="tasks-list-section">
          {loading ? (
            <div className="loading-state">
              <p>Loading your tasks...</p>
            </div>
          ) : filteredTasks && filteredTasks.length > 0 ? (
            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div className="task-title-section">
                      <h3>{task.title}</h3>
                      <span className="task-project-badge">{task.projectSlug}</span>
                    </div>
                    <div className="task-badges">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        {task.status === 'InProgress' ? 'In Progress' : task.status}
                      </span>
                      <span 
                        className="priority-badge" 
                        style={{ borderColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="task-date">
                        📅 Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <div className="task-actions">
                      <button className="action-btn edit-btn">Edit</button>
                      <button className="action-btn complete-btn">Mark Complete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No tasks found</p>
              <p>You don't have any tasks yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </section>
  );
}

export default Tasks;
