import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaEdit, FaTrashAlt, FaListAlt, FaFileCsv, FaTimes, FaCheck } from 'react-icons/fa';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
      setAllCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
      setCategories(allCategories);
    } else {
      const filtered = allCategories.filter((c) =>
        c.category_name.toLowerCase().includes(keyword)
      );
      setCategories(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/delete/`);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditValue(cat.category_name);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/categories/${id}/update/`, {
        category_name: editValue,
      });
      toast.success('Category updated successfully');
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-outfit font-bold text-gray-900 flex items-center gap-2">
            <FaListAlt className="text-orange-500" /> Manage Categories
          </h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
            {categories.length} total
          </span>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by category name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <CSVLink
            data={categories}
            filename="category_list.csv"
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
                <th className="px-5 py-4 text-left text-sm font-semibold w-16">S.No</th>
                <th className="px-5 py-4 text-left text-sm font-semibold">Category Name</th>
                <th className="px-5 py-4 text-left text-sm font-semibold">Created</th>
                <th className="px-5 py-4 text-left text-sm font-semibold w-48">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-orange-50/50 transition-colors">
                  <td className="px-5 py-4 text-gray-500 text-sm">{index + 1}</td>
                  <td className="px-5 py-4">
                    {editingId === cat.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-3 py-1.5 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 w-full max-w-xs"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{cat.category_name}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{cat.creation_date}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {editingId === cat.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(cat.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                          >
                            <FaCheck className="text-xs" /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                          >
                            <FaTimes className="text-xs" /> Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(cat)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            <FaEdit className="text-xs" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            <FaTrashAlt className="text-xs" /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="md:hidden space-y-3">
          {categories.map((cat, index) => (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">#{index + 1}</span>
                <span className="text-xs text-gray-400">{cat.creation_date}</span>
              </div>
              {editingId === cat.id ? (
                <div className="mb-3">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="px-3 py-2 border border-orange-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                    autoFocus
                  />
                </div>
              ) : (
                <h3 className="font-semibold text-gray-900 mb-3">{cat.category_name}</h3>
              )}
              <div className="flex gap-2">
                {editingId === cat.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(cat.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                      <FaCheck className="text-xs" /> Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
                      <FaTimes className="text-xs" /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(cat)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                      <FaEdit className="text-xs" /> Edit
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                      <FaTrashAlt className="text-xs" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCategory;