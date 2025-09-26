import React from 'react';

const ShippingInfo: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Shipping Information
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Learn about our shipping options and delivery times
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              🚚 Shipping Options
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Standard Shipping
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  5-7 business days • $5.99 (Free on orders over $50)
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  Perfect for non-urgent orders
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Express Shipping
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  2-3 business days • $12.99
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  For when you need it faster
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Overnight Shipping
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  1 business day • $24.99
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  Emergency orders only
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              🌍 International Shipping
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              We ship worldwide! International shipping rates vary by destination and are calculated at checkout.
            </p>
            <ul style={{
              color: '#6b7280',
              paddingLeft: '1.5rem',
              lineHeight: '1.6'
            }}>
              <li>United States: 5-10 business days</li>
              <li>Canada & Mexico: 7-14 business days</li>
              <li>Europe: 10-20 business days</li>
              <li>Asia & Australia: 15-25 business days</li>
              <li>All other countries: 20-30 business days</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              📦 Order Processing
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  1
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Order Placed</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Your order is confirmed</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  2
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Processing</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>We prepare your order (1-2 business days)</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  3
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Shipped</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Your order is on its way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;