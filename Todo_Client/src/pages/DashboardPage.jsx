import { useState, useEffect } from "react";
import Layout from "./Layout";
import AddTaskModal from "../components/AddTaskModal";
import { taskAPI } from "../services/api";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import StatisticsCards from "../components/StatisticsCards";
import TasksList from "../components/TasksList";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";
const DashboardPage = ({ isActive }) => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { getAll } = taskAPI;
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAll,
  });

  useEffect(() => {
    if (isActive == "pending") {
      if (data && data.length > 0) {
        const pending = data.filter((task) => !task.completed);
        setTasks(pending);
      }
    }

    if (isActive == "completed") {
      if (data && data.length > 0) {
        const pending = data.filter((task) => task.completed);
        setTasks(pending);
      }
    }

    if (isActive == "all") {
      if (data && data.length > 0) {
        setTasks(data);
      }
    }
  }, [data, isActive]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="space-y-6">
        {/* Statistics Cards */}
        <StatisticsCards tasks={data} />

        {/* Add Task Button */}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Số lượng ({tasks.length})
          </h2>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <IoMdAdd />
            <span>Thêm Công Việc</span>
          </button>
        </div>

        {/* Tasks List */}
        <TasksList Tasks={tasks} />

        {/* Add Task Modal */}
        {isAddModalOpen && (
          <AddTaskModal onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
