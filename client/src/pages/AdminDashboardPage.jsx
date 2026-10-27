import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import productService from '../services/productService';
import orderService from '../services/orderService';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'create-product'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('Smartphones');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newStock, setNewStock] = useState('15');
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsFeatured, setNewIsFeatured] = useState(false);
  const [newIsOffer, setNewIsOffer] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [ordersRes, productsRes] = await Promise.all([
        orderService.getAllOrders(),
        productService.getProducts({ limit: 50 }),
      ]);

      setOrders(ordersRes.orders || []);
      setProducts(productsRes.products || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      setActionSuccess(`Order status updated to ${newStatus}`);
      fetchData();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(productId);
      setActionSuccess('Product deleted successfully');
      fetchData();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newName,
        brand: newBrand,
        category: newCategory,
        price: Number(newPrice),
        originalPrice: newOriginalPrice ? Number(newOriginalPrice) : Number(newPrice),
        discountPercentage: newDiscount ? Number(newDiscount) : 0,
        countInStock: Number(newStock),
        image: newImage || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
        description: newDescription,
        isFeatured: newIsFeatured,
        isOffer: newIsOffer,
        specs: [
          { key: 'Category', value: newCategory },
          { key: 'Brand', value: newBrand },
        ],
      };

      await productService.createProduct(payload);
      setActionSuccess('New electronics product created successfully!');
      setActiveTab('products');
      // Reset form
      setNewName('');
      setNewBrand('');
      setNewPrice('');
      setNewOriginalPrice('');
      setNewDiscount('');
      setNewDescription('');
      setNewImage('');
      fetchData();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="heading-xl font-display">TechCart Admin Portal</h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
              Real-time electronics inventory and customer order management
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={16} /> All Orders ({orders.length})
            </button>
            <button
              className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={16} /> Products ({products.length})
            </button>
            <button
              className={`btn ${activeTab === 'create-product' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('create-product')}
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>TOTAL REVENUE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A', marginTop: '0.25rem' }}>
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#16A34A', marginTop: '0.2rem' }}>Calculated from confirmed orders</div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>TOTAL ORDERS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', marginTop: '0.25rem' }}>
              {orders.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>Customer transactions</div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>ACTIVE PRODUCTS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>In catalog database</div>
          </div>
        </div>

        {actionSuccess && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div style={{ background: 'white', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '1.75rem', overflowX: 'auto' }}>
            <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>
              Recent Orders ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <p style={{ color: '#64748B' }}>No orders found.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem' }}>Order ID</th>
                    <th style={{ padding: '0.75rem' }}>Customer</th>
                    <th style={{ padding: '0.75rem' }}>Date</th>
                    <th style={{ padding: '0.75rem' }}>Total</th>
                    <th style={{ padding: '0.75rem' }}>Payment</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem' }}>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#2563EB' }}>
                        {order.orderId}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 600 }}>{order.shippingAddress?.fullName || order.user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{order.user?.email}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', color: '#64748B' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700 }}>
                        ${order.totalPrice?.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: order.isPaid ? '#16A34A' : '#D97706', fontWeight: 600 }}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span
                          style={{
                            background:
                              order.orderStatus === 'Delivered'
                                ? '#DCFCE7'
                                : order.orderStatus === 'Shipped'
                                ? '#EDE9FE'
                                : '#EFF6FF',
                            color:
                              order.orderStatus === 'Delivered'
                                ? '#16A34A'
                                : order.orderStatus === 'Shipped'
                                ? '#7C3AED'
                                : '#2563EB',
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="form-select"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: '130px' }}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === 'products' && (
          <div style={{ background: 'white', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '1.75rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="heading-md">Products In Stock ({products.length})</h2>
              <button onClick={() => setActiveTab('create-product')} className="btn btn-primary btn-sm">
                <Plus size={15} /> Add New Item
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>Product</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Brand</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Stock</th>
                  <th style={{ padding: '0.75rem' }}>Rating</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.85rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '6px' }}
                      />
                      <span style={{ fontWeight: 600, color: '#0F172A', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', color: '#475569' }}>{p.category}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: '#475569' }}>{p.brand}</td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700 }}>${p.price}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span style={{ color: p.countInStock > 0 ? '#16A34A' : '#EF4444', fontWeight: 600 }}>
                        {p.countInStock}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{p.rating}★</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Create Product Form */}
        {activeTab === 'create-product' && (
          <div style={{ background: 'white', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '2.5rem', maxWidth: '720px', margin: '0 auto' }}>
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>
              Add New Electronics Product
            </h2>

            <form onSubmit={handleCreateProduct}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM6 Headphones"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                  >
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Smartwatches">Smartwatches</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brand *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. Sony, Apple, Dell"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price ($) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="299"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Original Price ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    placeholder="349"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter detailed technical features and product summary..."
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0 1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={newIsFeatured}
                    onChange={(e) => setNewIsFeatured(e.target.checked)}
                    style={{ accentColor: '#2563EB' }}
                  />
                  <span>Mark as Featured Product</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={newIsOffer}
                    onChange={(e) => setNewIsOffer(e.target.checked)}
                    style={{ accentColor: '#2563EB' }}
                  />
                  <span>Include in Special Offers</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Create & Publish Product
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
