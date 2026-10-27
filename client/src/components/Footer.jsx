import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Heart,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-column">
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-logo-icon">
                <Zap size={20} fill="white" />
              </div>
              <span>
                Tech<span className="brand-dot">Cart</span>
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              TechCart is your premium destination for high-performance laptops, cutting-edge smartphones, audiophile headphones, and elite tech accessories.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#38BDF8" /> 100 Tech Park Blvd, Innovation District
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#38BDF8" /> +1 (800) TECH-CART
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#38BDF8" /> support@techcart.com
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="footer-column">
            <h4>Shop Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/category/Smartphones">Smartphones</Link>
              </li>
              <li>
                <Link to="/category/Laptops">Laptops & Ultrabooks</Link>
              </li>
              <li>
                <Link to="/category/Headphones">Headphones & Audio</Link>
              </li>
              <li>
                <Link to="/category/Accessories">Keyboards & Mice</Link>
              </li>
              <li>
                <Link to="/category/Smartwatches">Smartwatches</Link>
              </li>
              <li>
                <Link to="/offers">Deals & Offers</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Navigation */}
          <div className="footer-column">
            <h4>Account & Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/cart">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/my-orders">Track Orders</Link>
              </li>
              <li>
                <Link to="/my-account">My Account</Link>
              </li>
              <li>
                <Link to="/login">Sign In / Register</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Guarantees & Newsletter */}
          <div className="footer-column">
            <h4>TechCart Guarantees</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={20} color="#38BDF8" />
                <span style={{ fontSize: '0.85rem' }}>100% Genuine Certified Products</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Truck size={20} color="#38BDF8" />
                <span style={{ fontSize: '0.85rem' }}>Free Express Shipping over $100</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <RotateCcw size={20} color="#38BDF8" />
                <span style={{ fontSize: '0.85rem' }}>30-Day Hassle-Free Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CreditCard size={20} color="#38BDF8" />
                <span style={{ fontSize: '0.85rem' }}>Demo Card & Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} TechCart Electronics Store. Built for College Web Development Project.
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: '#94A3B8' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
