import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import HomePage from './pages/customer/HomePage';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import BillPage from './pages/customer/BillPage';

import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import OrdersPage from './pages/admin/OrdersPage';
import KitchenDisplay from './pages/admin/KitchenDisplay';
import InventoryPage from './pages/admin/InventoryPage';
import SalesReport from './pages/admin/SalesReport';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<><Navbar /><HomePage /></>} />
      <Route path="/menu" element={<><Navbar /><MenuPage /></>} />
      <Route path="/cart" element={<><Navbar /><CartPage /></>} />
      <Route path="/checkout" element={<><Navbar /><CheckoutPage /></>} />
      <Route path="/bill/:orderId" element={<><Navbar /><BillPage /></>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/menu" element={<ProtectedRoute><MenuManagement /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/admin/kitchen" element={<ProtectedRoute><KitchenDisplay /></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
      <Route path="/admin/sales" element={<ProtectedRoute><SalesReport /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
