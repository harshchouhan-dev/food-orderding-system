import { FaShoppingCart, FaStar, FaFire } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const API_BASE = 'http://127.0.0.1:8000';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(food);
    toast.success(`${food.item_name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: true,
      theme: 'colored',
    });
  };

  const imageUrl = food.image
    ? food.image.startsWith('http')
      ? food.image
      : `${API_BASE}${food.image.startsWith('/') ? '' : '/'}${food.image}`
    : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={food.item_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
          ₹{food.item_price}
        </div>

        {/* Popular Badge */}
        {food.is_available && (
          <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
            <FaFire className="text-yellow-300" /> Available
          </div>
        )}

        {/* Hover Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white text-orange-500"
        >
          <FaShoppingCart />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className="text-yellow-400 text-xs" />
          ))}
          <span className="text-gray-400 text-xs ml-1">(4.8)</span>
        </div>

        <h3 className="font-outfit font-semibold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {food.item_name}
        </h3>

        <p className="text-gray-400 text-sm mb-1 line-clamp-1">
          {food.category_name || 'Delicious Food'}
        </p>

        {food.item_description && (
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
            {food.item_description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-orange-600 font-bold text-xl font-outfit">₹{food.item_price}</span>
            <span className="text-gray-400 text-xs ml-1">/ {food.item_quantity}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <FaShoppingCart className="text-xs" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
