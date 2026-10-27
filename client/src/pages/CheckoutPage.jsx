import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  QrCode,
  Banknote,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice, clearCart, showToast } =
    useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.shippingAddress?.street || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [state, setState] = useState(user?.shippingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(user?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.shippingAddress?.country || 'India');

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (Demo)');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('842');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !phone || !street || !city || !postalCode) {
      setError('Please fill in all mandatory shipping address fields.');
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName,
          phone,
          street,
          city,
          state,
          postalCode,
          country,
        },
        paymentMethod,
      };

      const result = await orderService.createOrder(orderData);

      if (result.success && result.order) {
        clearCart();
        showToast('Order confirmed successfully!', 'success');
        navigate(`/order-success`, { state: { order: result.order } });
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please check stock and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        <h1 className="heading-xl font-display" style={{ marginBottom: '0.5rem' }}>
          Checkout & Finalize Order
        </h1>
        <p style={{ color: '#64748B', marginBottom: '2.5rem' }}>
          Please verify your shipping address and select a demo payment method
        </p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 0.9fr',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left: Address & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address Section */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    1
                  </div>
                  <h3 className="heading-md">Shipping Address</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sharayu Patil"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai / Pune"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State / Region</label>
                    <input
                      type="text"
                      className="form-input"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Postal Code *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="400001"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#2563EB',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    2
                  </div>
                  <h3 className="heading-md">Payment Method (Demo Gateway)</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* COD Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `2px solid ${
                        paymentMethod === 'Cash on Delivery (Demo)' ? '#2563EB' : '#E2E8F0'
                      }`,
                      background:
                        paymentMethod === 'Cash on Delivery (Demo)' ? '#EFF6FF' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery (Demo)"
                      checked={paymentMethod === 'Cash on Delivery (Demo)'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ accentColor: '#2563EB' }}
                    />
                    <Banknote size={24} color="#16A34A" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        Cash on Delivery (COD Demo)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Pay in cash upon doorstep delivery. No advance online transaction needed.
                      </div>
                    </div>
                  </label>

                  {/* Card Demo Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `2px solid ${
                        paymentMethod === 'Credit / Debit Card (Demo)' ? '#2563EB' : '#E2E8F0'
                      }`,
                      background:
                        paymentMethod === 'Credit / Debit Card (Demo)' ? '#EFF6FF' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit / Debit Card (Demo)"
                      checked={paymentMethod === 'Credit / Debit Card (Demo)'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ accentColor: '#2563EB' }}
                    />
                    <CreditCard size={24} color="#2563EB" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        Credit / Debit Card (Demo Simulation)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Simulated test gateway for Visa / Mastercard / RuPay demo transactions.
                      </div>
                    </div>
                  </label>

                  {/* UPI Demo Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `2px solid ${
                        paymentMethod === 'UPI / QR (Demo)' ? '#2563EB' : '#E2E8F0'
                      }`,
                      background: paymentMethod === 'UPI / QR (Demo)' ? '#EFF6FF' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI / QR (Demo)"
                      checked={paymentMethod === 'UPI / QR (Demo)'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ accentColor: '#2563EB' }}
                    />
                    <QrCode size={24} color="#7C3AED" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        UPI / QR Code (Demo Instant)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Simulate instant payment via Google Pay, PhonePe, or Paytm UPI ID.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Review & Confirmation */}
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '90px',
              }}
            >
              <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>
                Order Summary ({cartItems.length} items)
              </h3>

              {/* Items small preview */}
              <div
                style={{
                  maxHeight: '220px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  paddingRight: '0.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '1rem',
                }}
              >
                {cartItems.map((item) => (
                  <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0, fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ color: '#64748B' }}>
                        Qty: {item.quantity} &times; ${item.price.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>${itemsPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Shipping</span>
                  <span style={{ fontWeight: 600, color: shippingPrice === 0 ? '#16A34A' : '#0F172A' }}>
                    {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Estimated Tax (5%)</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>${taxPrice.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Total Due</span>
                  <span className="current-price" style={{ fontSize: '1.6rem' }}>
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block btn-lg"
                style={{ marginBottom: '1rem' }}
              >
                {loading ? 'Processing Order...' : 'Confirm & Place Order'} <ArrowRight size={18} />
              </button>

              <div style={{ fontSize: '0.78rem', color: '#64748B', textAlign: 'center' }}>
                🔒 This is a simulated checkout demonstration. No actual currency is debited.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
