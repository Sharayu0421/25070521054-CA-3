import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  ArrowRight,
  Printer,
} from 'lucide-react';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/my-orders" replace />;
  }

  // Calculate estimated delivery: 3 business days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div style={{ padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '3rem 2.5rem',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center',
          }}
        >
          {/* Success Check Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <CheckCircle2 size={48} />
          </div>

          <span
            style={{
              background: '#EFF6FF',
              color: '#2563EB',
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
            }}
          >
            ORDER CONFIRMED
          </span>

          <h1 className="heading-xl font-display" style={{ margin: '1rem 0 0.5rem' }}>
            Thank You for Shopping at TechCart!
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Your order has been recorded in our MongoDB database and is now being prepped for dispatch.
          </p>

          {/* Key Order Highlight Card */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.25rem',
              textAlign: 'left',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>ORDER IDENTIFIER</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563EB', marginTop: '0.2rem' }}>
                {order.orderId}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>ESTIMATED DELIVERY</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                {formattedDelivery}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>PAYMENT METHOD</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                {order.paymentMethod}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>TOTAL AMOUNT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginTop: '0.2rem' }}>
                ${order.totalPrice?.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div
            style={{
              textAlign: 'left',
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#0F172A' }}>
              <MapPin size={18} color="#2563EB" />
              <span>Deliver To</span>
            </div>
            <div style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <strong>{order.shippingAddress?.fullName}</strong> ({order.shippingAddress?.phone})<br />
              {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/my-orders" className="btn btn-primary btn-lg">
              <Package size={18} /> View in My Orders
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
