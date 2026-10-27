import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Sparkles, Truck, Headphones } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <Sparkles size={14} />
              NEW GENERATION ELECTRONICS 2026
            </div>
            <h1 className="hero-title font-display">
              Unleash Next-Level Tech with <span>TechCart</span>.
            </h1>
            <p className="hero-subtitle">
              Discover flagship laptops, high-definition smartphones, studio headphones, and high-precision accessories at unmatched prices with express delivery and official warranty.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop All Products <ArrowRight size={18} />
              </Link>
              <Link to="/offers" className="btn btn-navy btn-lg" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                <Zap size={18} color="#F87171" /> Limited Time Deals
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>100%</h4>
                <p>Authentic Tech</p>
              </div>
              <div className="stat-item">
                <h4>2-Year</h4>
                <p>Full Warranty</p>
              </div>
              <div className="stat-item">
                <h4>Free</h4>
                <p>Shipping &gt; $100</p>
              </div>
              <div className="stat-item">
                <h4>24/7</h4>
                <p>Tech Support</p>
              </div>
            </div>
          </div>

          <div>
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80"
                alt="TechCart Premium Electronics Showcase"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
