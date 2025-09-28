import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b py-3 border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="#"
                className="flex items-center justify-center space-x-2 h-20 overflow-hidden"
              >
                <img src={assets.logo} alt="Logo" className=" w-45 h-auto" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-gray-600 text-sm">
                    Xin chào, <strong>{user.username}</strong>
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
        <Sidebar isActive={isActive} />

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
