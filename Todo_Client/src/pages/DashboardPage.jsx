import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TaskItem from "../components/TaskItem";
import AddTaskModal from "../components/AddTaskModal";
// import { taskAPI } from "../services/api";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Get pending tasks only
  const pendingTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    // fetchTasks();
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
      toast.success("Thêm công việc thành công!");
      setError("");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Không thể thêm công việc!");
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
      toast.success(
        response.data.completed
          ? "Đã hoàn thành công việc!"
          : "Đã khôi phục công việc!"
      );
      setError("");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Không thể cập nhật công việc!");
      setError("Failed to update task");
    }
  };

  const handleEditTask = async (taskId, updateData) => {
    try {
      const response = await taskAPI.update(taskId, updateData);
      setTasks(
        tasks.map((t) => (t._id === taskId ? { ...t, ...response.data } : t))
      );
      toast.success("Cập nhật công việc thành công!");
      setError("");
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Không thể cập nhật công việc!");
      setError("Failed to edit task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      try {
        await taskAPI.delete(taskId);
        setTasks(tasks.filter((t) => t._id !== taskId));
        toast.success("Xóa công việc thành công!");
        setError("");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Không thể xóa công việc!");
        setError("Failed to delete task");
      }
    }
  };

  // Calculate statistics
  const getStats = () => {
    const stats = {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      work: tasks.filter((t) => t.category === "work").length,
      personal: tasks.filter((t) => t.category === "personal").length,
      shopping: tasks.filter((t) => t.category === "shopping").length,
      others: tasks.filter((t) => t.category === "others").length,
    };
    stats.pending = stats.total - stats.completed;
    return stats;
  };

  const stats = getStats();

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bảng Điều Khiển
          </h1>
          <p className="text-gray-600">Quản lý công việc đang chờ xử lý</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  {stats.pending}
                </h3>
                <p className="text-blue-600 text-sm">Đang Chờ</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {stats.completed}
                </h3>
                <p className="text-green-600 text-sm">Hoàn Thành</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-purple-800">
                  {stats.total}
                </h3>
                <p className="text-purple-600 text-sm">Tổng Cộng</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-yellow-800">
                  {stats.total > 0
                    ? Math.round((stats.completed / stats.total) * 100)
                    : 0}
                  %
                </h3>
                <p className="text-yellow-600 text-sm">Tiến Độ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Công Việc Đang Chờ ({pendingTasks.length})
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Thêm Công Việc</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-center">
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ×
            </button>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có công việc đang chờ! 🎉
              </h3>
              <p className="text-gray-500">Thêm công việc mới để bắt đầu.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
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

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={handleAddTask}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;
