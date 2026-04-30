import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaUtensils, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || '---';

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />

      <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Animated checkmark */}
          <div className="relative mb-8 inline-block">
            <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-fade-in">
              <FaCheckCircle className="text-green-500 text-6xl animate-bounce-slow" />
            </div>
            <div className="absolute inset-0 w-28 h-28 bg-green-200/50 rounded-full mx-auto animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-gray-900 mb-3 animate-fade-in-up">
            Order Placed! 🎉
          </h1>

          <p className="text-gray-500 text-lg mb-2 animate-fade-in-up">
            Your order has been placed successfully
          </p>

          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-xl font-semibold text-lg mb-6 animate-fade-in-up">
            Order #{orderId}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 text-left animate-fade-in-up">
            <h3 className="font-outfit font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { step: '1', text: 'Your order is being reviewed by the restaurant', color: 'bg-blue-500' },
                { step: '2', text: 'The kitchen will start preparing your food', color: 'bg-yellow-500' },
                { step: '3', text: 'A delivery partner will pick up your order', color: 'bg-orange-500' },
                { step: '4', text: 'Hot, fresh food arrives at your doorstep!', color: 'bg-green-500' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`w-7 h-7 ${item.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {item.step}
                  </div>
                  <span className="text-gray-600 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
            >
              <FaHome /> Go Home
            </Link>
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              <FaUtensils /> Order Again <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
