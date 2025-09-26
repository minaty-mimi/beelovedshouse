import React from 'react';

const Returns: React.FC = () => {
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
          Returns & Exchanges
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Our hassle-free return policy
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
              🔄 Return Policy
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              We want you to love your purchase! If you're not completely satisfied, you can return most items within 30 days of delivery for a full refund or exchange.
            </p>
            <div style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '0.375rem',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <p style={{ color: '#92400e', fontWeight: '500' }}>
                💡 <strong>Important:</strong> Digital downloads are not eligible for returns due to their nature. Physical items must be in original condition with tags attached.
              </p>
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
              📋 How to Return an Item
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Contact Us</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Email us at returns@beelovedshouse.com or use our contact form with your order number
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Pack Your Item</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Place the item in its original packaging with all tags and accessories
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Ship It Back</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    We'll provide a prepaid return label for US customers. International customers pay return shipping
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  4
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Get Refunded</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Refunds are processed within 3-5 business days after we receive your return
                  </p>
                </div>
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
              ❓ Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  How long do I have to return an item?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  You have 30 days from the date of delivery to initiate a return.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  What items cannot be returned?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Digital downloads, personalized items, and items damaged due to misuse cannot be returned.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  How do I get my refund?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Refunds are issued to the original payment method within 3-5 business days after we receive your return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;