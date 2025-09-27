import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TaskItem from "../components/TaskItem";
import AddTaskModal from "../components/AddTaskModal";
import { taskAPI } from "../services/api";
import "./AllTasksPage.css";

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll();
      setTasks(response.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskAPI.create(taskData);
      setTasks([...tasks, response.data]);
      setError("");
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task");
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      const response = await taskAPI.update(taskId, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((t) =>
          t._id === taskId ? { ...t, completed: response.data.completed } : t
        )
      );
      setError("");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  const handleEditTask = async (taskId, updateData) => {
    try {
      const response = await taskAPI.update(taskId, updateData);
      setTasks(
        tasks.map((t) => (t._id === taskId ? { ...t, ...response.data } : t))
      );
      setError("");
    } catch (error) {
      console.error("Error editing task:", error);
      setError("Failed to edit task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.delete(taskId);
        setTasks(tasks.filter((t) => t._id !== taskId));
        setError("");
      } catch (error) {
        console.error("Error deleting task:", error);
        setError("Failed to delete task");
      }
    }
  };

  // Filter tasks based on completion status and category
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const categoryMatch =
      categoryFilter === "all" || task.categoryChoosed === categoryFilter;

    return statusMatch && categoryMatch;
  });

  // Calculate statistics
  const getStats = () => {
    const stats = {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      work: tasks.filter((t) => t.categoryChoosed === "work").length,
      personal: tasks.filter((t) => t.categoryChoosed === "personal").length,
      shopping: tasks.filter((t) => t.categoryChoosed === "shopping").length,
      others: tasks.filter((t) => t.categoryChoosed === "others").length,
    };
    stats.pending = stats.total - stats.completed;
    return stats;
  };

  const stats = getStats();

  return (
    <Layout>
      <div className="all-tasks-page">
        <div className="page-info">
          <h5>All Tasks</h5>
        </div>

        <div className="upper-section">
          <div className="greeting-user-section">
            <h2 className="greeting-user">Task Overview</h2>
            <div>Here are all your tasks</div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {Math.round((stats.completed / stats.total) * 100) || 0}%
              </div>
              <div className="stat-label">Progress</div>
            </div>
          </div>
        </div>

        <div className="category-stats">
          <h6>Tasks by Category</h6>
          <div className="category-stats-grid">
            <div className="category-stat">
              <span className="category-color work"></span>
              Work: {stats.work}
            </div>
            <div className="category-stat">
              <span className="category-color personal"></span>
              Personal: {stats.personal}
            </div>
            <div className="category-stat">
              <span className="category-color shopping"></span>
              Shopping: {stats.shopping}
            </div>
            <div className="category-stat">
              <span className="category-color others"></span>
              Others: {stats.others}
            </div>
          </div>
        </div>

        <div className="task-controls">
          <div className="filters">
            <div className="filter-group">
              <label>Status:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
          <div className="add-task-button-section">
            <button
              className="add-task-button"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Task
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError("")} className="error-close">
              ×
            </button>
          </div>
        )}

        <div className="tasks-section">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks found!</p>
              <p>Try adjusting your filters or add a new task.</p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={handleAddTask}
        />
      </div>
    </Layout>
  );
};

export default AllTasksPage;
