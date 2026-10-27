import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, ShieldCheck, Flame, Award } from 'lucide-react';
import productService from '../services/productService';
import HeroBanner from '../components/HeroBanner';
import TrustBadges from '../components/TrustBadges';
import CategorySection from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        // Fetch featured products
        const featuredRes = await productService.getProducts({ featured: true, limit: 8 });
        setFeaturedProducts(featuredRes.products || []);

        // Fetch limited-time deal products
        const dealsRes = await productService.getProducts({ offers: true, limit: 4 });
        setDealProducts(dealsRes.products || []);
      } catch (err) {
        console.error('Failed to load homepage products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroBanner />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Departments / Categories */}
      <CategorySection />

      {/* Featured Deals & Offers Section */}
      <section style={{ padding: '3rem 0', background: '#F1F5F9' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Flame size={18} /> Limited-Time Deals
              </div>
              <h2 className="heading-lg font-display">Flash Offers & Discounts</h2>
            </div>
            <Link to="/offers" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              View All Deals <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              Loading top deals...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {dealProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending / Featured Electronics */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563EB', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Award size={18} /> Hand-Picked Flagships
              </div>
              <h2 className="heading-lg font-display">Featured Electronics</h2>
            </div>
            <Link to="/products" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Browse Complete Catalog <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              Loading featured electronics...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner / Student & Developer Discount */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #0A192F 0%, #1E293B 100%)',
              borderRadius: '20px',
              padding: '3rem',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                STUDENT & DEVELOPER PERK
              </span>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0.85rem 0', fontFamily: 'Space Grotesk, sans-serif' }}>
                Upgrade Your Coding & Creative Setup
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Get certified Apple silicon, RTX laptops, ergonomic mechanical keyboards, and 4K external monitors tested and recommended for developers.
              </p>
            </div>
            <div>
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore Pro Gear <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
