import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyAccountPage from './pages/MyAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <ToastContainer />

      <main className="main-content">
        <Routes>
          {/* 1. Home */}
          <Route path="/" element={<HomePage />} />

          {/* 2. All Products */}
          <Route path="/products" element={<ProductsPage />} />

          {/* 3. Smartphones, 4. Laptops, 5. Headphones, 6. Accessories, and dynamic categories */}
          <Route path="/category/:category" element={<ProductsPage />} />

          {/* 7. Offers & Hot Deals */}
          <Route path="/offers" element={<ProductsPage defaultOffersOnly={true} />} />

          {/* Product Detail */}
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* 9. Shopping Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout & Order Confirmation */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />

          {/* 8. My Account (Protected) */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />

          {/* 10. My Orders (Protected) */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Management (Admin Protected) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
