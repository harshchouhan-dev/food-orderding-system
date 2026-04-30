import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboardList, FaEye, FaTimes, FaTruck, FaCheck, FaBan, FaUtensils, FaBoxOpen } from 'react-icons/fa';

const statusConfig = {
  not_confirmed: { label: 'Not Confirmed', color: 'bg-yellow-100 text-yellow-700', icon: FaClipboardList },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700', icon: FaCheck },
  preparing: { label: 'Preparing', color: 'bg-purple-100 text-purple-700', icon: FaUtensils },
  pickup: { label: 'Ready for Pickup', color: 'bg-orange-100 text-orange-700', icon: FaBoxOpen },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: FaTruck },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: FaBan },
};

const ManageOrders = () => {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const url = statusFilter === 'all'
        ? 'http://127.0.0.1:8000/api/orders/'
        : `http://127.0.0.1:8000/api/orders/?status=${statusFilter}`;
      const response = await axios.get(url);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [statusFilter]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/status/`, { status: newStatus });
      toast.success(`Order status updated to ${statusConfig[newStatus]?.label || newStatus}`);
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}/delete/`);
      toast.success('Order deleted');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const pageTitle = statusFilter === 'all' ? 'All Orders' : (statusConfig[statusFilter]?.label || 'Orders');

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-outfit font-bold text-gray-900 flex items-center gap-2">
            <FaClipboardList className="text-orange-500" /> {pageTitle}
          </h2>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold">
            {orders.length} orders
          </span>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <FaClipboardList className="text-5xl text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.not_confirmed;
              const StatusIcon = config.icon;
              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="font-outfit font-bold text-gray-900">Order #{order.id}</span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          <StatusIcon className="text-xs" /> {config.label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>👤 {order.customer_name} • 📱 {order.customer_phone}</p>
                        <p>📍 {order.delivery_address}</p>
                        <p>📅 {new Date(order.order_date).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xl font-outfit font-bold text-orange-600">₹{order.total_amount}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          <FaEye className="text-xs" /> View
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                          <FaTimes className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-outfit font-bold text-gray-900">Order #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Customer</p>
                  <p className="font-medium text-gray-900">{selectedOrder.customer_name}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Phone</p>
                  <p className="font-medium text-gray-900">{selectedOrder.customer_phone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                  <p className="text-gray-400 text-xs mb-1">Address</p>
                  <p className="font-medium text-gray-900">{selectedOrder.delivery_address}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Total</p>
                  <p className="font-bold text-orange-600 text-lg">₹{selectedOrder.total_amount}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Date</p>
                  <p className="font-medium text-gray-900 text-xs">{new Date(selectedOrder.order_date).toLocaleString()}</p>
                </div>
              </div>

              {selectedOrder.special_instructions && (
                <div className="bg-yellow-50 rounded-xl p-3 text-sm">
                  <p className="text-yellow-600 font-medium text-xs mb-1">Special Instructions</p>
                  <p className="text-yellow-800">{selectedOrder.special_instructions}</p>
                </div>
              )}

              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div>
                  <p className="font-medium text-gray-900 mb-2 text-sm">Order Items:</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                        <span className="text-gray-700">{item.food_name} × {item.quantity}</span>
                        <span className="font-medium text-gray-900">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Actions */}
            <div>
              <p className="font-medium text-gray-900 mb-3 text-sm">Update Status:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => updateStatus(selectedOrder.id, key)}
                    disabled={selectedOrder.status === key}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedOrder.status === key
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `${config.color} hover:opacity-80`
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageOrders;
