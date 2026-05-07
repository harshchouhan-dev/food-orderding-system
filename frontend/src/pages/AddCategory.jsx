import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaPlusCircle, FaListAlt } from 'react-icons/fa';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-category/`, {
        category_name: categoryName,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setCategoryName('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to add category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-outfit font-bold text-gray-900 flex items-center gap-2 mb-6">
          <FaPlusCircle className="text-orange-500" /> Add Category
        </h2>

        <div className="max-w-xl">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaListAlt className="text-orange-500" /> Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Indian, Chinese, Italian..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
              >
                <FaPlusCircle />
                {loading ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;