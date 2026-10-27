import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Zap,
  Package,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  SlidersHorizontal,
  Home,
  Tag,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header>
      {/* Top Bar for customer perks & demo notice */}
      <div className="navbar-top">
        <div className="container navbar-top-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>⚡ Next-Day Express Delivery Available</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>🛡️ 2-Year Manufacturer Warranty on All Electronics</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>College Project Edition &bull; MERN Stack</span>
            {isAdmin && (
              <span style={{ background: '#2563EB', padding: '2px 8px', borderRadius: '4px', color: '#fff', fontSize: '0.72rem', fontWeight: 'bold' }}>
                Admin Mode
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="container">
          <div className="navbar-row">
            {/* Brand Logo */}
            <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
              <div className="brand-logo-icon">
                <Zap size={22} fill="white" />
              </div>
              <span>
                Tech<span className="brand-dot">Cart</span>
              </span>
            </Link>

            {/* Keyword Search Bar */}
            <form className="search-bar-container" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-left" />
                <input
                  type="text"
                  placeholder="Search laptops, smartphones, headphones, keyboards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn-action">
                  Search
                </button>
              </div>
            </form>

            {/* Actions: Account & Cart */}
            <div className="navbar-actions">
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    className="nav-action-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    title="User Profile Menu"
                  >
                    <User size={19} color="#38BDF8" />
                    <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                    <ChevronDown size={14} />
                  </button>

                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '120%',
                        background: '#1E293B',
                        borderRadius: '10px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        width: '210px',
                        zIndex: 100,
                        padding: '0.5rem 0',
                      }}
                    >
                      <div
                        style={{
                          padding: '0.5rem 1rem',
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '0.8rem',
                          color: '#94A3B8',
                        }}
                      >
                        Signed in as
                        <div style={{ color: 'white', fontWeight: 600 }}>{user?.email}</div>
                      </div>

                      <Link
                        to="/my-account"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.65rem 1rem',
                          color: '#E2E8F0',
                          fontSize: '0.88rem',
                        }}
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={16} /> My Account
                      </Link>

                      <Link
                        to="/my-orders"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.65rem 1rem',
                          color: '#E2E8F0',
                          fontSize: '0.88rem',
                        }}
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Package size={16} /> My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.65rem 1rem',
                            color: '#38BDF8',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                          }}
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <SlidersHorizontal size={16} /> Admin Portal
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.65rem 1rem',
                          color: '#F87171',
                          background: 'transparent',
                          border: 'none',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                        }}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="nav-action-btn">
                  <User size={19} />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Shopping Cart Link */}
              <Link to="/cart" className="nav-action-btn" title="View Cart">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                className="nav-action-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ display: 'none' }}
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* 10 Required Navigation Tabs Bar */}
        <div className="navbar-tabs-bar">
          <div className="container">
            <ul className="navbar-tabs-list">
              {/* 1. Home */}
              <li className="nav-tab-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Home size={15} /> Home
                </NavLink>
              </li>

              {/* 2. All Products */}
              <li className="nav-tab-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Package size={15} /> All Products
                </NavLink>
              </li>

              {/* 3. Smartphones */}
              <li className="nav-tab-item">
                <NavLink
                  to="/category/Smartphones"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Smartphone size={15} /> Smartphones
                </NavLink>
              </li>

              {/* 4. Laptops */}
              <li className="nav-tab-item">
                <NavLink
                  to="/category/Laptops"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Laptop size={15} /> Laptops
                </NavLink>
              </li>

              {/* 5. Headphones */}
              <li className="nav-tab-item">
                <NavLink
                  to="/category/Headphones"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Headphones size={15} /> Headphones
                </NavLink>
              </li>

              {/* 6. Accessories */}
              <li className="nav-tab-item">
                <NavLink
                  to="/category/Accessories"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <SlidersHorizontal size={15} /> Accessories
                </NavLink>
              </li>

              {/* 7. Offers */}
              <li className="nav-tab-item">
                <NavLink
                  to="/offers"
                  className={({ isActive }) => `nav-tab-link offers-tab ${isActive ? 'active' : ''}`}
                >
                  <Zap size={15} /> Offers & Deals
                </NavLink>
              </li>

              {/* 8. My Account */}
              <li className="nav-tab-item">
                <NavLink
                  to="/my-account"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <User size={15} /> My Account
                </NavLink>
              </li>

              {/* 9. Shopping Cart */}
              <li className="nav-tab-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <ShoppingCart size={15} /> Shopping Cart {cartCount > 0 && `(${cartCount})`}
                </NavLink>
              </li>

              {/* 10. My Orders */}
              <li className="nav-tab-item">
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) => `nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  <Clock size={15} /> My Orders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
