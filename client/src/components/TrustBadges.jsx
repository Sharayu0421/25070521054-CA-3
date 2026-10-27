import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

const TrustBadges = () => {
  return (
    <div className="container">
      <div className="trust-badges-grid">
        <div className="trust-badge-card">
          <div className="trust-icon-box">
            <Truck size={22} />
          </div>
          <div>
            <h4>Free Express Shipping</h4>
            <p>On orders above $100</p>
          </div>
        </div>

        <div className="trust-badge-card">
          <div className="trust-icon-box">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4>2-Year Warranty</h4>
            <p>100% genuine brand guarantee</p>
          </div>
        </div>

        <div className="trust-badge-card">
          <div className="trust-icon-box">
            <CreditCard size={22} />
          </div>
          <div>
            <h4>Flexible Checkout</h4>
            <p>COD & Demo Card options</p>
          </div>
        </div>

        <div className="trust-badge-card">
          <div className="trust-icon-box">
            <Headphones size={22} />
          </div>
          <div>
            <h4>Dedicated Support</h4>
            <p>24/7 tech assistance & returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
