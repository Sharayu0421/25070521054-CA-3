import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '6rem 1rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 800,
            lineHeight: 1,
            color: '#2563EB',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          404
        </h1>
        <h2 className="heading-lg font-display" style={{ margin: '1rem 0 0.5rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
          The page or electronic gadget category you are looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
