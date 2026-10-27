import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Package,
} from 'lucide-react';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);

        const data = await productService.getProductById(id);
        setProduct(data.product);

        // Fetch related products in the same category
        if (data.product?.category) {
          const relatedData = await productService.getProducts({
            category: data.product.category,
            limit: 4,
          });
          setRelatedProducts(
            (relatedData.products || []).filter((p) => p._id !== data.product._id)
          );
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= (product?.countInStock || 1)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (product && product.countInStock > 0) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product && product.countInStock > 0) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', color: '#64748B' }}>
        <h2>Loading electronic product specifications...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <AlertTriangle size={52} color="#EF4444" style={{ marginBottom: '1rem' }} />
        <h2 className="heading-lg">Product Not Found</h2>
        <p style={{ color: '#64748B', margin: '0.5rem 0 1.5rem' }}>
          {error || "The product you're looking for doesn't exist or has been discontinued."}
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to All Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.countInStock <= 0;
  const isLowStock = product.countInStock > 0 && product.countInStock <= 5;

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#64748B',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/" style={{ color: '#64748B' }}>
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: '#64748B' }}>
            Products
          </Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category}`} style={{ color: '#64748B' }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: '#0F172A', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) 1.25fr',
            gap: '3.5rem',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '4rem',
          }}
        >
          {/* Left: Product Image */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1 / 1',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {product.discountPercentage > 0 && (
                <span className="discount-badge" style={{ fontSize: '0.85rem', padding: '0.35rem 0.8rem' }}>
                  <Zap size={14} style={{ display: 'inline', marginRight: 3 }} />
                  SAVE {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Quick Guarantees Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.82rem',
                  color: '#475569',
                  background: '#F8FAFC',
                  padding: '0.75rem',
                  borderRadius: '10px',
                }}
              >
                <Truck size={18} color="#2563EB" />
                <span>Free Express Delivery</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.82rem',
                  color: '#475569',
                  background: '#F8FAFC',
                  padding: '0.75rem',
                  borderRadius: '10px',
                }}
              >
                <ShieldCheck size={18} color="#2563EB" />
                <span>2-Year Full Warranty</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Purchase Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  background: '#EFF6FF',
                  color: '#2563EB',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {product.brand}
              </span>
              <span
                style={{
                  background: '#F1F5F9',
                  color: '#475569',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                {product.category}
              </span>
            </div>

            <h1 className="heading-xl font-display" style={{ marginBottom: '1rem', lineHeight: '1.2' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="rating-row" style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    fill={i < Math.floor(product.rating || 5) ? '#F59E0B' : 'none'}
                    stroke={i < Math.floor(product.rating || 5) ? '#F59E0B' : '#CBD5E1'}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>{product.rating?.toFixed(1) || '4.9'}</span>
              <span>&bull;</span>
              <span style={{ color: '#64748B' }}>{product.numReviews || 84} verified customer reviews</span>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
              }}
            >
              <span className="current-price" style={{ fontSize: '2.2rem' }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price" style={{ fontSize: '1.1rem' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span
                    style={{
                      color: '#16A34A',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      background: '#DCFCE7',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    You save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div style={{ marginBottom: '1.5rem' }}>
              {isOutOfStock ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', fontWeight: 600 }}>
                  <AlertTriangle size={18} /> Out of Stock
                </div>
              ) : isLowStock ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D97706', fontWeight: 600 }}>
                  <Package size={18} /> Only {product.countInStock} items left in stock — order soon!
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16A34A', fontWeight: 600 }}>
                  <CheckCircle2 size={18} /> In Stock ({product.countInStock} units ready to ship)
                </div>
              )}
            </div>

            {/* Description */}
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Quantity and Actions */}
            {!isOutOfStock && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      padding: '0.65rem 1rem',
                      fontSize: '1.1rem',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 1.25rem', fontWeight: 700, fontSize: '1rem' }}>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.countInStock}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      padding: '0.65rem 1rem',
                      fontSize: '1.1rem',
                      cursor: quantity >= product.countInStock ? 'not-allowed' : 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCart} className="btn btn-primary btn-lg" style={{ flex: '1', minWidth: '180px' }}>
                  <ShoppingCart size={19} /> Add to Cart
                </button>

                <button onClick={handleBuyNow} className="btn btn-navy btn-lg" style={{ minWidth: '140px' }}>
                  Buy Now
                </button>
              </div>
            )}

            {/* Key Features Checklist */}
            {product.features && product.features.length > 0 && (
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  Key Highlights
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {product.features.map((feat, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#475569' }}>
                      <CheckCircle2 size={15} color="#16A34A" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Table */}
        {product.specs && product.specs.length > 0 && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '4rem',
            }}
          >
            <h3 className="heading-lg font-display" style={{ marginBottom: '1.5rem' }}>
              Technical Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
              {product.specs.map((spec, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    padding: '0.85rem 1rem',
                    background: index % 2 === 0 ? '#F8FAFC' : 'white',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#64748B' }}>{spec.key}</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="heading-lg font-display" style={{ marginBottom: '1.75rem' }}>
              Similar Electronics in {product.category}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
