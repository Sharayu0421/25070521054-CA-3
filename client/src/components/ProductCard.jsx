import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.countInStock > 0) {
      addToCart(product, 1);
    }
  };

  const isOutOfStock = product.countInStock === 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              <Zap size={11} style={{ display: 'inline', marginRight: 2 }} />
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="category-tag">{product.category}</div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div className="rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating || 5) ? '#F59E0B' : 'none'}
                stroke={i < Math.floor(product.rating || 5) ? '#F59E0B' : '#CBD5E1'}
              />
            ))}
          </div>
          <span>
            {product.rating?.toFixed(1) || '4.8'} ({product.numReviews || 12})
          </span>
        </div>

        <div className="price-row">
          <span className="current-price">${product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>

      <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
        <button
          className="btn btn-primary btn-block btn-sm"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{
            background: isOutOfStock ? '#94A3B8' : undefined,
          }}
        >
          <ShoppingCart size={15} />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
