import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaEnvelope, FaStickyNote } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    delivery_address: '',
    special_instructions: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        total_amount: getCartTotal().toFixed(2),
        items: cartItems.map((item) => ({
          food_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.item_price) * item.quantity,
        })),
      };

      const response = await axios.post(`${API_BASE}/api/place-order/`, orderData);

      if (response.status === 201) {
        clearCart();
        navigate('/order-success', { state: { orderId: response.data.order_id } });
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deliveryFee = getCartTotal() > 500 ? 0 : 40;
  const tax = getCartTotal() * 0.05;
  const grandTotal = getCartTotal() + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <ToastContainer />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/menu" className="p-2 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-300">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-gray-900">
                Your <span className="text-gradient">Cart</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">{getCartCount()} items in your cart</p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingCart className="text-4xl text-orange-300" />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const imageUrl = item.image
                    ? item.image.startsWith('http')
                      ? item.image
                      : `${API_BASE}${item.image.startsWith('/') ? '' : '/'}${item.image}`
                    : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';

                  return (
                    <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all duration-300">
                      <img
                        src={imageUrl}
                        alt={item.item_name}
                        className="w-full sm:w-28 h-28 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-outfit font-semibold text-gray-900 text-lg">{item.item_name}</h3>
                            <p className="text-gray-400 text-sm">{item.item_quantity}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                          <span className="font-outfit font-bold text-orange-600 text-xl">
                            ₹{(parseFloat(item.item_price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={clearCart}
                  className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors duration-200"
                >
                  Clear entire cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="font-outfit font-bold text-xl text-gray-900 mb-6">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Subtotal ({getCartCount()} items)</span>
                      <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Delivery Fee</span>
                      <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Tax (5%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-green-600 text-xs bg-green-50 px-3 py-2 rounded-lg">🎉 Free delivery on orders above ₹500!</p>
                    )}
                    <hr className="border-gray-100" />
                    <div className="flex justify-between text-gray-900 font-bold text-lg">
                      <span>Total</span>
                      <span className="text-gradient font-outfit text-xl">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {!showCheckout ? (
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 active:scale-[0.98]"
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                      <h4 className="font-outfit font-semibold text-gray-900">Delivery Details</h4>

                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input name="customer_name" value={formData.customer_name} onChange={handleChange} type="text" placeholder="Your Name" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm" />
                      </div>

                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input name="customer_phone" value={formData.customer_phone} onChange={handleChange} type="tel" placeholder="Phone Number" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm" />
                      </div>

                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input name="customer_email" value={formData.customer_email} onChange={handleChange} type="email" placeholder="Email (optional)" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm" />
                      </div>

                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400 text-sm" />
                        <textarea name="delivery_address" value={formData.delivery_address} onChange={handleChange} placeholder="Delivery Address" required rows="2" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm resize-none" />
                      </div>

                      <div className="relative">
                        <FaStickyNote className="absolute left-3 top-4 text-gray-400 text-sm" />
                        <textarea name="special_instructions" value={formData.special_instructions} onChange={handleChange} placeholder="Special instructions (optional)" rows="2" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm resize-none" />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                      >
                        {loading ? 'Placing Order...' : `Place Order • ₹${grandTotal.toFixed(2)}`}
                      </button>

                      <p className="text-center text-gray-400 text-xs">💳 Cash on Delivery</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
