import React, { useState } from "react";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleSave = () => {
    onEdit(task._id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      work: "bg-blue-100 text-blue-800",
      personal: "bg-green-100 text-green-800", 
      shopping: "bg-yellow-100 text-yellow-800",
      others: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 transition-all duration-200 hover:shadow-lg ${
      task.completed ? "border-l-green-500 bg-gray-50" : "border-l-blue-500"
    }`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tiêu đề công việc"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="2"
                placeholder="Mô tả công việc"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Lưu
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-lg font-medium ${
                  task.completed ? "line-through text-gray-500" : "text-gray-900"
                }`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center space-x-2">
                  {task.category && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  )}
                  
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Chỉnh sửa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => onDelete(task._id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Xóa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {task.description && (
                <p className={`text-sm mb-2 ${
                  task.completed ? "text-gray-400" : "text-gray-600"
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>
                  Tạo: {new Date(task.createdAt).toLocaleDateString('vi-VN')}
                </span>
                {task.updatedAt !== task.createdAt && (
                  <span>
                    Cập nhật: {new Date(task.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;