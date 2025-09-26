import React from 'react';

const SizeGuide: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Size Guide
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Find your perfect fit with our detailed sizing information
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
              👕 Tote Bags
            </h2>
            <div style={{
              overflowX: 'auto',
              marginTop: '1rem'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#111827',
                      border: '1px solid #e5e7eb'
                    }}>
                      Size
                    </th>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#111827',
                      border: '1px solid #e5e7eb'
                    }}>
                      Width (inches)
                    </th>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#111827',
                      border: '1px solid #e5e7eb'
                    }}>
                      Height (inches)
                    </th>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#111827',
                      border: '1px solid #e5e7eb'
                    }}>
                      Handle Length (inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      Small
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      13
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      13
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      24
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      Medium
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      16
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      16
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      24
                    </td>
                  </tr>
                  <tr>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      Large
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      18
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      18
                    </td>
                    <td style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      30
                    </td>
                  </tr>
                </tbody>
              </table>
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
              📏 How to Measure
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Width
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  Measure across the bottom of the bag from side seam to side seam.
                </p>
                <div style={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  📐 Width measurement illustration
                </div>
              </div>
              <div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Height
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  Measure from the bottom of the bag to the top edge.
                </p>
                <div style={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  📏 Height measurement illustration
                </div>
              </div>
              <div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Handle Length
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  Measure from the top of the bag to the end of the handle.
                </p>
                <div style={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  👜 Handle measurement illustration
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
              💡 Size Tips
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#eff6ff',
                borderRadius: '0.375rem',
                border: '1px solid #dbeafe'
              }}>
                <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
                  Small (13" x 13")
                </h3>
                <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                  Perfect for light shopping, books, or a small lunch. Great for kids or minimalists.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '0.375rem',
                border: '1px solid #dcfce7'
              }}>
                <h3 style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
                  Medium (16" x 16")
                </h3>
                <p style={{ color: '#166534', fontSize: '0.875rem' }}>
                  Most popular size! Great for groceries, work items, or a full day's essentials.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#fef3c7',
                borderRadius: '0.375rem',
                border: '1px solid #fde68a'
              }}>
                <h3 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                  Large (18" x 18")
                </h3>
                <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                  Maximum capacity for heavy loads, bulk shopping, or multiple items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;