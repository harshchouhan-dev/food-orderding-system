import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaUtensils } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, catRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/foods/`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories/`),
        ]);
        setFoods(foodRes.data);
        setAllFoods(foodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allFoods];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        (food) => food.category === parseInt(activeCategory)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (food) =>
          food.item_name.toLowerCase().includes(query) ||
          (food.item_description && food.item_description.toLowerCase().includes(query))
      );
    }

    setFoods(filtered);
  }, [activeCategory, searchQuery, allFoods]);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <ToastContainer />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center pt-8">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-white mb-4 animate-fade-in-up">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Menu</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 animate-fade-in-up">
              Discover our wide range of delicious dishes. From starters to desserts, we have something for everyone.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative animate-fade-in-up">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none">
            <path d="M0,40L80,45C160,50,320,60,480,55C640,50,800,30,960,25C1120,20,1280,30,1360,35L1440,40V80H1360C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-orange-500" />
            <span className="font-medium text-gray-700">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(String(cat.id))}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === String(cat.id)
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat.category_name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Grid */}
      <section className="py-8 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-semibold text-gray-900">{foods.length}</span> items
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : foods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FaUtensils className="text-6xl text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-outfit font-semibold text-gray-400 mb-2">No items found</h3>
              <p className="text-gray-400">Try a different category or search term.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
