import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, SlidersHorizontal, Watch, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Smartphones', label: 'Smartphones', icon: Smartphone, count: 'iPhone, Galaxy, Pixel' },
  { name: 'Laptops', label: 'Laptops', icon: Laptop, count: 'MacBook, XPS, Zephyrus' },
  { name: 'Headphones', label: 'Headphones', icon: Headphones, count: 'Sony, Bose, AirPods' },
  { name: 'Accessories', label: 'Accessories', icon: SlidersHorizontal, count: 'Keyboards, Mice, SSDs' },
  { name: 'Smartwatches', label: 'Smartwatches', icon: Watch, count: 'Apple Watch, Galaxy Watch' },
];

const CategorySection = () => {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore Categories
            </div>
            <h2 className="heading-lg font-display">Shop by Department</h2>
          </div>
          <Link to="/products" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/category/${cat.name}`}
                className="category-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="category-icon-wrapper">
                  <Icon size={28} />
                </div>
                <div>
                  <h3>{cat.label}</h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem' }}>
                    {cat.count}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
