import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaUtensils, FaTruck, FaClock, FaStar, FaShieldAlt, FaQuoteLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, catRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/foods/'),
          axios.get('http://127.0.0.1:8000/api/categories/'),
        ]);
        setFoods(foodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const features = [
    { icon: FaUtensils, title: 'Fresh Ingredients', desc: 'We use only the freshest ingredients sourced daily from local markets.' },
    { icon: FaTruck, title: 'Fast Delivery', desc: 'Get your food delivered hot and fresh within 30 minutes or less.' },
    { icon: FaClock, title: 'Easy Ordering', desc: 'Order in just a few taps. Simple, fast, and hassle-free experience.' },
    { icon: FaShieldAlt, title: 'Safe & Hygienic', desc: 'All our kitchens follow strict hygiene protocols for your safety.' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'The food quality is absolutely amazing! Best food delivery service in the city.', rating: 5 },
    { name: 'Rahul Verma', text: 'Fast delivery, great taste, and the prices are very reasonable. Highly recommended!', rating: 5 },
    { name: 'Anita Patel', text: 'I order from FoodieHub every week. Their paneer dishes are to die for!', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <ToastContainer />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Now Delivering Near You
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-outfit font-bold text-white leading-tight mb-6">
                Delicious Food,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Delivered Fast
                </span>
              </h1>

              <p className="text-gray-400 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
                Explore our curated menu of mouthwatering dishes made with love and the finest ingredients. Order now and taste the difference.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/menu"
                  className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Menu
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  View Cart
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { value: '500+', label: 'Happy Customers' },
                  { value: '100+', label: 'Menu Items' },
                  { value: '30min', label: 'Fast Delivery' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-outfit font-bold text-white">{stat.value}</div>
                    <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:flex justify-center animate-fade-in">
              <div className="relative">
                <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop"
                    alt="Delicious food platter"
                    className="w-72 h-72 xl:w-80 xl:h-80 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 animate-bounce-slow">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaTruck className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery</p>
                    <p className="text-sm font-bold text-gray-900">Free</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaStar className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="text-sm font-bold text-gray-900">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-gray-900 mt-3">
              What Makes Us <span className="text-gradient">Special</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-50 rounded-2xl flex items-center justify-center mb-5 group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-500">
                  <feature.icon className="text-orange-500 text-xl group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-outfit font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Browse</span>
              <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-gray-900 mt-3">
                Food <span className="text-gradient">Categories</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat, index) => (
                <Link
                  key={cat.id}
                  to="/menu"
                  className="group px-6 py-3 bg-white rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                    {cat.category_name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Food Section */}
      {foods.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
              <div>
                <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Our Menu</span>
                <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-gray-900 mt-3">
                  Popular <span className="text-gradient">Dishes</span>
                </h2>
              </div>
              <Link
                to="/menu"
                className="group flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors duration-200"
              >
                View Full Menu
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.slice(0, 8).map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>

            {foods.length === 0 && (
              <div className="text-center py-20">
                <FaUtensils className="text-6xl text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No food items available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white mt-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                <FaQuoteLeft className="text-orange-500/30 text-3xl mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6">{item.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-gray-900 mb-6">
            Ready to Order <span className="text-gradient">Delicious Food</span>?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Browse our menu, pick your favorites, and get them delivered right to your doorstep. It's that simple!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            Order Now <FaArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;