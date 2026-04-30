import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import ManageCategory from './pages/ManageCategory';
import AddFood from './pages/AddFood';
import ManageFood from './pages/ManageFood';
import ManageOrders from './pages/ManageOrders';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          {/* Admin Pages */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/manage-food-item" element={<ManageFood />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
