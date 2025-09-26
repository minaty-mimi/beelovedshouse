import React from 'react';

const Stickers: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Stickers
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Cute and fun stickers to brighten up your day
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '200px',
                backgroundColor: '#fce7f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#be185d'
              }}>
                ⭐ Sticker {item}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Cute Sticker {item}
                </h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  fontSize: '0.875rem'
                }}>
                  Adorable sticker design.
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: '#111827'
                  }}>
                    $6.99
                  </span>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stickers;