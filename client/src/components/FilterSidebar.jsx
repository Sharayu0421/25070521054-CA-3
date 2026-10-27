import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';

const FilterSidebar = ({
  categories = [],
  brands = [],
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onResetFilters,
}) => {
  return (
    <aside className="filter-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>
          <Filter size={18} color="#2563EB" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          title="Reset all filters"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Category</h4>
        <div
          className="filter-option-item"
          style={{
            fontWeight: selectedCategory === 'All' ? 700 : 500,
            color: selectedCategory === 'All' ? '#2563EB' : undefined,
          }}
          onClick={() => onSelectCategory('All')}
        >
          <span>All Categories</span>
          {selectedCategory === 'All' && <Check size={16} />}
        </div>
        {categories.map((cat) => (
          <div
            key={cat}
            className="filter-option-item"
            style={{
              fontWeight: selectedCategory === cat ? 700 : 500,
              color: selectedCategory === cat ? '#2563EB' : undefined,
            }}
            onClick={() => onSelectCategory(cat)}
          >
            <span>{cat}</span>
            {selectedCategory === cat && <Check size={16} />}
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Brand</h4>
        <div
          className="filter-option-item"
          style={{
            fontWeight: selectedBrand === 'All' ? 700 : 500,
            color: selectedBrand === 'All' ? '#2563EB' : undefined,
          }}
          onClick={() => onSelectBrand('All')}
        >
          <span>All Brands</span>
          {selectedBrand === 'All' && <Check size={16} />}
        </div>
        {brands.map((brand) => (
          <div
            key={brand}
            className="filter-option-item"
            style={{
              fontWeight: selectedBrand === brand ? 700 : 500,
              color: selectedBrand === brand ? '#2563EB' : undefined,
            }}
            onClick={() => onSelectBrand(brand)}
          >
            <span>{brand}</span>
            {selectedBrand === brand && <Check size={16} />}
          </div>
        ))}
      </div>

      {/* Price Range Slider */}
      <div className="filter-group">
        <h4 className="filter-title">Max Price: ${priceRange}</h4>
        <input
          type="range"
          min="50"
          max="4000"
          step="50"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748B', marginTop: '0.35rem' }}>
          <span>$50</span>
          <span>$4,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="filter-group">
        <h4 className="filter-title">Customer Rating</h4>
        {[4, 3, 0].map((rating) => (
          <div
            key={rating}
            className="filter-option-item"
            style={{
              fontWeight: minRating === rating ? 700 : 500,
              color: minRating === rating ? '#2563EB' : undefined,
            }}
            onClick={() => onRatingChange(rating)}
          >
            <span>{rating === 0 ? 'Any Rating' : `${rating}★ & above`}</span>
            {minRating === rating && <Check size={16} />}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
