import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle, FaUtensils, FaRupeeSign, FaImage, FaAlignLeft, FaBoxes, FaListAlt } from 'react-icons/fa';

const AddFood = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    item_name: '',
    item_price: '',
    item_description: '',
    image: null,
    item_quantity: '',
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('category', formData.category);
    data.append('item_name', formData.item_name);
    data.append('item_price', formData.item_price);
    data.append('item_description', formData.item_description);
    data.append('item_quantity', formData.item_quantity);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-food-item/', data);

      if (response.status === 201) {
        toast.success(response.data.message);
        setFormData({
          category: '',
          item_name: '',
          item_price: '',
          item_description: '',
          image: null,
          item_quantity: '',
        });
        setPreview(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add food item');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-outfit font-bold text-gray-900 flex items-center gap-2 mb-6">
          <FaPlusCircle className="text-orange-500" /> Add Food Item
        </h2>

        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaListAlt className="text-orange-500" /> Food Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUtensils className="text-orange-500" /> Food Item Name
                </label>
                <input
                  name="item_name"
                  type="text"
                  value={formData.item_name}
                  onChange={handleChange}
                  placeholder="e.g. Paneer Butter Masala"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaAlignLeft className="text-orange-500" /> Description
                </label>
                <textarea
                  name="item_description"
                  value={formData.item_description}
                  onChange={handleChange}
                  placeholder="A brief description of the food item..."
                  rows="3"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Quantity & Price row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaBoxes className="text-orange-500" /> Quantity
                  </label>
                  <input
                    name="item_quantity"
                    type="text"
                    value={formData.item_quantity}
                    onChange={handleChange}
                    placeholder="e.g. 2pcs / large"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaRupeeSign className="text-orange-500" /> Price (₹)
                  </label>
                  <input
                    name="item_price"
                    type="number"
                    value={formData.item_price}
                    step=".01"
                    onChange={handleChange}
                    placeholder="e.g. 199.00"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaImage className="text-orange-500" /> Image
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-400 transition-colors duration-300">
                  {preview ? (
                    <div className="mb-3">
                      <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto" />
                    </div>
                  ) : (
                    <FaImage className="text-4xl text-gray-200 mx-auto mb-3" />
                  )}
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
              >
                <FaPlusCircle />
                {loading ? 'Adding...' : 'Add Food Item'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddFood;