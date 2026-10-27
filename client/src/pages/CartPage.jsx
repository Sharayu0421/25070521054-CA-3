import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
    showToast,
  } = useCart();

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'TECH10') {
      const discount = Number((itemsPrice * 0.1).toFixed(2));
      setDiscountAmount(discount);
      setAppliedPromo('TECH10 (10% OFF)');
      showToast('Promo code TECH10 applied successfully!', 'success');
    } else {
      showToast('Invalid promo code. Try TECH10 for 10% off', 'error');
    }
  };

  const finalTotal = Math.max(0, Number((totalPrice - discountAmount).toFixed(2)));

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '20px',
            padding: '3rem 2rem',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <ShoppingBag size={40} />
          </div>
          <h2 className="heading-lg font-display" style={{ marginBottom: '0.75rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Looks like you haven't added any electronic gear yet. Explore our laptops, smartphones, headphones, and accessories!
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="heading-xl font-display">Shopping Cart</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              Review your items before proceeding to checkout
            </p>
          </div>
          <button
            onClick={clearCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#EF4444',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        {/* 2-Column Cart Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cartItems.map((item) => (
              <div
                key={item.product}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '12px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    to={`/product/${item.product}`}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.name}
                  </Link>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                      ${item.price.toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#94A3B8' }}>
                        ${item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    style={{
                      background: '#F8FAFC',
                      border: 'none',
                      padding: '0.45rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 0.85rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    disabled={item.quantity >= (item.countInStock || 99)}
                    style={{
                      background: '#F8FAFC',
                      border: 'none',
                      padding: '0.45rem 0.65rem',
                      cursor: item.quantity >= (item.countInStock || 99) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Line Total */}
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '0.4rem',
                    borderRadius: '6px',
                  }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Back link */}
            <div style={{ marginTop: '1rem' }}>
              <Link to="/products" className="btn btn-outline">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '90px',
            }}
          >
            <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>${itemsPrice.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Estimated Shipping</span>
                <span style={{ fontWeight: 600, color: shippingPrice === 0 ? '#16A34A' : '#0F172A' }}>
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Estimated Tax (5%)</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>${taxPrice.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 600 }}>
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div
                style={{
                  borderTop: '1px solid #E2E8F0',
                  paddingTop: '1rem',
                  marginTop: '0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Estimated Total</span>
                <span className="current-price" style={{ fontSize: '1.6rem' }}>
                  ${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Promo code (e.g. TECH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="form-input"
                  style={{ textTransform: 'uppercase' }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  Apply
                </button>
              </div>
            </form>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-block btn-lg"
              style={{ marginBottom: '1.25rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="#16A34A" /> Secure 256-Bit SSL Checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={16} color="#2563EB" /> Free Delivery on orders over $100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
