import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaEdit, FaTrashAlt, FaUtensils, FaFileCsv } from 'react-icons/fa';

const API_BASE = 'http://127.0.0.1:8000';

const ManageFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [allFoodItems, setAllFoodItems] = useState([]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/foods/`);
      setFoodItems(response.data);
      setAllFoodItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleFoodSearch = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
      setFoodItems(allFoodItems);
    } else {
      const filtered = allFoodItems.filter((c) =>
        c.item_name.toLowerCase().includes(keyword)
      );
      setFoodItems(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      await axios.delete(`${API_BASE}/api/foods/${id}/delete/`);
      toast.success('Food item deleted successfully');
      fetchFoods();
    } catch (error) {
      toast.error('Failed to delete food item');
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-outfit font-bold text-gray-900 flex items-center gap-2">
            <FaUtensils className="text-orange-500" /> Manage Food Items
          </h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
            {foodItems.length} total
          </span>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by food item name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
              onChange={(e) => handleFoodSearch(e.target.value)}
            />
          </div>
          <CSVLink
            data={foodItems}
            filename="food_list.csv"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            <FaFileCsv /> Export CSV
          </CSVLink>
        </div>

        {/* Table (Desktop) */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-4 py-4 text-left text-sm font-semibold w-14">S.No</th>
                <th className="px-4 py-4 text-left text-sm font-semibold w-20">Image</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Qty</th>
                <th className="px-4 py-4 text-left text-sm font-semibold w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {foodItems.map((food, index) => {
                const imageUrl = food.image
                  ? food.image.startsWith('http')
                    ? food.image
                    : `${API_BASE}${food.image.startsWith('/') ? '' : '/'}${food.image}`
                  : null;

                return (
                  <tr key={food.id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="px-4 py-3 text-gray-500 text-sm">{index + 1}</td>
                    <td className="px-4 py-3">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={food.item_name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FaUtensils className="text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 text-sm">{food.item_name}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{food.category_name || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600 text-sm">₹{food.item_price}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{food.item_quantity}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(food.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                          <FaTrashAlt className="text-xs" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="md:hidden space-y-3">
          {foodItems.map((food, index) => {
            const imageUrl = food.image
              ? food.image.startsWith('http')
                ? food.image
                : `${API_BASE}${food.image.startsWith('/') ? '' : '/'}${food.image}`
              : null;

            return (
              <div key={food.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex gap-3 mb-3">
                  {imageUrl ? (
                    <img src={imageUrl} alt={food.item_name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaUtensils className="text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{food.item_name}</h3>
                    <p className="text-sm text-gray-400">{food.category_name || 'Uncategorized'}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-bold text-orange-600">₹{food.item_price}</span>
                      <span className="text-xs text-gray-400">{food.item_quantity}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(food.id)}
                  className="w-full flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                >
                  <FaTrashAlt className="text-xs" /> Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageFood;