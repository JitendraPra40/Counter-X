import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

import Welcome from './pages/Welcome';
import Menu from './pages/Menu';
import OrderSummary from './pages/OrderSummary';
import Payment from './pages/Payment';
import Receipt from './pages/Receipt';
import Kitchen from './pages/Kitchen';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import SalesBoard from './pages/SalesBoard';
import StaffLogin from './pages/StaffLogin';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/salesboard" element={<SalesBoard />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
