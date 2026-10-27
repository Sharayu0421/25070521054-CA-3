import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import orderService from '../services/orderService';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Delivered':
      return { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' };
    case 'Shipped':
      return { bg: '#EDE9FE', text: '#7C3AED', border: '#C4B5FD' };
    case 'Processing':
      return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' };
    default:
      return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
  }
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await orderService.getMyOrders();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || 'Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 className="heading-xl font-display">My Orders</h1>
          <p style={{ color: '#64748B', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Track deliveries, view past purchases, and manage electronics receipts
          </p>
        </div>

        {loading ? (
          <div style={{ padding: '5rem 0', textAlign: 'center', color: '#64748B' }}>
            <h2>Loading your order records...</h2>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid #E2E8F0',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Package size={36} />
            </div>
            <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>No orders yet</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              You haven't placed any electronic orders yet. Explore our latest flagship laptops, smartphones, and accessories!
            </p>
            <Link to="/products" className="btn btn-primary">
              Discover Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order) => {
              const badge = getStatusBadge(order.orderStatus);
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={order._id}
                  style={{
                    background: 'white',
                    borderRadius: '18px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Order Card Header */}
                  <div
                    style={{
                      background: '#F8FAFC',
                      padding: '1.25rem 1.75rem',
                      borderBottom: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                          ORDER ID
                        </div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A' }}>
                          {order.orderId}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                          DATE PLACED
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
                          {orderDate}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                          TOTAL AMOUNT
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2563EB' }}>
                          ${order.totalPrice?.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          padding: '0.35rem 0.85rem',
                          borderRadius: '999px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <CheckCircle2 size={14} /> {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: '1.5rem 1.75rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {order.orderItems.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            borderBottom:
                              index < order.orderItems.length - 1 ? '1px solid #F1F5F9' : 'none',
                            paddingBottom: index < order.orderItems.length - 1 ? '1.25rem' : '0',
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '70px',
                              height: '70px',
                              objectFit: 'contain',
                              background: '#F8FAFC',
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0',
                              padding: '4px',
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <Link
                              to={`/product/${item.product}`}
                              style={{
                                fontWeight: 700,
                                fontSize: '0.98rem',
                                color: '#0F172A',
                                textDecoration: 'none',
                              }}
                            >
                              {item.name}
                            </Link>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                              Qty: {item.quantity} &times; ${item.price?.toLocaleString()}
                            </div>
                          </div>
                          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>
                            ${(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping & Payment Meta */}
                    <div
                      style={{
                        marginTop: '1.5rem',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontSize: '0.85rem',
                        color: '#475569',
                      }}
                    >
                      <div>
                        <strong>Shipping to:</strong> {order.shippingAddress?.fullName},{' '}
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} -{' '}
                        {order.shippingAddress?.postalCode}
                      </div>
                      <div>
                        <strong>Payment:</strong> {order.paymentMethod}{' '}
                        {order.isPaid ? (
                          <span style={{ color: '#16A34A', fontWeight: 600 }}>(Paid)</span>
                        ) : (
                          <span style={{ color: '#D97706', fontWeight: 600 }}>(Due on delivery)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
