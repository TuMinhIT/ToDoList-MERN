import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9802/9802618.png"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gray-800">Todos.</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-gray-600 text-sm">
                    Xin chào, <strong>{user.name}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Đăng Xuất
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
              Bộ Sưu Tập
            </h2>
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
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
                Công Việc Đang Chờ
              </Link>
              <Link
                to="/completed"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/completed")
                    ? "bg-green-100 text-green-700 border-r-2 border-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
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
                Công Việc Hoàn Thành
              </Link>
              <Link
                to="/all"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/all")
                    ? "bg-purple-100 text-purple-700 border-r-2 border-purple-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
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
                Tất Cả Công Việc
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
