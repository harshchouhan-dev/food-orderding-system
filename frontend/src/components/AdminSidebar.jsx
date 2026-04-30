import { Link, useLocation } from 'react-router-dom';
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaList,
  FaThLarge,
  FaUser,
  FaUtensils,
  FaClipboardList,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    category: false,
    food: false,
    orders: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-4 py-3 flex items-center gap-3 rounded-xl mx-2 text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;

  const subLinkClass = (path) =>
    `block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
      isActive(path)
        ? 'text-orange-400 bg-white/5'
        : 'text-gray-400 hover:text-orange-400 hover:bg-white/5'
    }`;

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white flex flex-col fixed top-0 left-0 z-40 overflow-y-auto">
      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <FaTimes />
      </button>

      {/* Profile */}
      <div className="text-center p-6 border-b border-white/5">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20">
          <FaUser className="text-white text-xl" />
        </div>
        <h4 className="mt-3 font-outfit font-semibold">Admin Panel</h4>
        <p className="text-gray-500 text-xs mt-1">FoodieHub Management</p>
      </div>

      {/* Menu */}
      <div className="flex flex-col py-4 space-y-1 flex-1">
        {/* Dashboard */}
        <Link to="/admin-dashboard" className={linkClass('/admin-dashboard')}>
          <FaThLarge className="text-sm" /> Dashboard
        </Link>

        {/* Category */}
        <button
          onClick={() => toggleMenu('category')}
          className="px-4 py-3 mx-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white flex items-center justify-between text-sm font-medium transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <FaEdit className="text-sm" /> Food Category
          </span>
          {openMenus.category ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${openMenus.category ? 'max-h-40' : 'max-h-0'}`}>
          <div className="flex flex-col pl-10 pr-4 space-y-1 pb-2">
            <Link to="/add-category" className={subLinkClass('/add-category')}>Add Category</Link>
            <Link to="/manage-category" className={subLinkClass('/manage-category')}>Manage Category</Link>
          </div>
        </div>

        {/* Food */}
        <button
          onClick={() => toggleMenu('food')}
          className="px-4 py-3 mx-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white flex items-center justify-between text-sm font-medium transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <FaUtensils className="text-sm" /> Food Item
          </span>
          {openMenus.food ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${openMenus.food ? 'max-h-40' : 'max-h-0'}`}>
          <div className="flex flex-col pl-10 pr-4 space-y-1 pb-2">
            <Link to="/add-food" className={subLinkClass('/add-food')}>Add Food Item</Link>
            <Link to="/manage-food-item" className={subLinkClass('/manage-food-item')}>Manage Food Item</Link>
          </div>
        </div>

        {/* Orders */}
        <button
          onClick={() => toggleMenu('orders')}
          className="px-4 py-3 mx-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white flex items-center justify-between text-sm font-medium transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <FaList className="text-sm" /> Food Orders
          </span>
          {openMenus.orders ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${openMenus.orders ? 'max-h-80' : 'max-h-0'}`}>
          <div className="flex flex-col pl-10 pr-4 space-y-1 pb-2">
            <Link to="/manage-orders?status=not_confirmed" className={subLinkClass('/manage-orders')}>Not Confirmed</Link>
            <Link to="/manage-orders?status=confirmed" className={subLinkClass('')}>Confirmed</Link>
            <Link to="/manage-orders?status=preparing" className={subLinkClass('')}>Being Prepared</Link>
            <Link to="/manage-orders?status=pickup" className={subLinkClass('')}>Ready for Pickup</Link>
            <Link to="/manage-orders?status=delivered" className={subLinkClass('')}>Delivered</Link>
            <Link to="/manage-orders?status=cancelled" className={subLinkClass('')}>Cancelled</Link>
            <Link to="/manage-orders?status=all" className={subLinkClass('')}>All Orders</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <FaUtensils className="text-white text-xs" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-300">FoodieHub</p>
            <p className="text-[10px] text-gray-500">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
