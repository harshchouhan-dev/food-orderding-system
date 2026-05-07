import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { FaListAlt, FaUtensils, FaShoppingBag, FaRupeeSign, FaUsers, FaClock, FaArrowUp } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_categories: 0,
    total_food_items: 0,
    total_orders: 0,
    total_revenue: 0,
    pending_orders: 0,
    total_users: 0,
    recent_orders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard-stats/`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Categories', value: stats.total_categories, icon: FaListAlt, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Food Items', value: stats.total_food_items, icon: FaUtensils, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50' },
    { label: 'Total Orders', value: stats.total_orders, icon: FaShoppingBag, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue', value: `₹${stats.total_revenue.toLocaleString()}`, icon: FaRupeeSign, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: stats.pending_orders, icon: FaClock, color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Registered Users', value: stats.total_users, icon: FaUsers, color: 'from-pink-500 to-rose-600', bg: 'bg-pink-50' },
  ];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900">
            Dashboard <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${loading ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                  <card.icon className="text-white text-lg" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded-lg">
                  <FaArrowUp className="text-[10px]" /> Active
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900">
                {loading ? '—' : card.value}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-5 md:p-6 border-b border-gray-100">
            <h2 className="text-lg font-outfit font-bold text-gray-900">Recent Orders</h2>
          </div>

          {stats.recent_orders.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <FaShoppingBag className="text-4xl mx-auto mb-3 text-gray-200" />
              <p>No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recent_orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-900 text-sm">#{order.id}</td>
                      <td className="px-5 py-4 text-gray-600 text-sm">{order.customer_name}</td>
                      <td className="px-5 py-4 text-gray-500 text-sm hidden md:table-cell">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900 text-sm">₹{order.total_amount}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          order.status === 'preparing' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;