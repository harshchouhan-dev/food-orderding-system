import { FaBars, FaBell, FaChevronRight, FaChevronLeft, FaSignOutAlt, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin-logout/');
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/admin-login');
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="p-2.5 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-200"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <FaChevronLeft className="text-sm" /> : <FaChevronRight className="text-sm" />}
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FaUtensils className="text-white text-xs" />
            </div>
            <span className="text-lg font-outfit font-bold text-gray-900">
              FoodieHub <span className="text-gray-400 font-normal text-sm">Admin</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification */}
          <button className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
            <FaBell className="text-gray-400 group-hover:text-orange-500 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Logout */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 text-sm font-medium"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </nav>
  );
};

export default AdminHeader;