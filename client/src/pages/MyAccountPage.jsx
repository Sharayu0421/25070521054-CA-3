import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Save,
  Package,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MyAccountPage = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.shippingAddress?.street || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [state, setState] = useState(user?.shippingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(user?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.shippingAddress?.country || 'India');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await updateProfile({
        name,
        phone,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country,
        },
        password: newPassword || undefined,
      });
      setMessage('Your account profile was updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : '2026';

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #1E293B 100%)',
            borderRadius: '20px',
            padding: '2.5rem',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="heading-lg font-display" style={{ color: 'white', marginBottom: '0.25rem' }}>
                {user?.name}
              </h1>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{user?.email}</div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span
                  style={{
                    background: user?.role === 'admin' ? '#2563EB' : 'rgba(255,255,255,0.12)',
                    padding: '2px 10px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {user?.role === 'admin' ? 'System Administrator' : 'Verified Member'}
                </span>
                <span style={{ color: '#94A3B8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> Member since {memberSince}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ color: '#F87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {message && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Edit Profile Form */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>
            Account & Delivery Settings
          </h2>

          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Read-only)</label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ background: '#F8FAFC', color: '#64748B', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div style={{ margin: '1.5rem 0 1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                Default Shipping Address
              </h3>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street, flat, building..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State / Region</label>
                  <input
                    type="text"
                    className="form-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ margin: '1.5rem 0 1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                Change Password (Optional)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
                Leave empty if you don't wish to change your password
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                <Save size={18} /> {loading ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
