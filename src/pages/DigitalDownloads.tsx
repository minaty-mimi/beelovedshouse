import React from 'react';

const DigitalDownloads: React.FC = () => {
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
          Digital Downloads
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Instant access to your digital products
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
              📧 How to Access Your Downloads
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Check Your Email</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    After purchase, you'll receive an email with download links within 5 minutes
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Click Download Links</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Each link is unique to your order and expires after 30 days
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>Save Your Files</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Download and save files to your preferred location immediately
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
              💾 File Formats & Requirements
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Digital Wallpapers
                </h3>
                <ul style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  paddingLeft: '1rem'
                }}>
                  <li>PNG format (transparent background)</li>
                  <li>JPG format (white background)</li>
                  <li>High resolution (3000x2000px)</li>
                  <li>Print-ready quality</li>
                </ul>
              </div>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Coloring Pages
                </h3>
                <ul style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  paddingLeft: '1rem'
                }}>
                  <li>PDF format (printable)</li>
                  <li>JPG format (digital use)</li>
                  <li>8.5x11 inches</li>
                  <li>High resolution</li>
                </ul>
              </div>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Stickers
                </h3>
                <ul style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  paddingLeft: '1rem'
                }}>
                  <li>PNG format (transparent)</li>
                  <li>SVG format (vector)</li>
                  <li>Various sizes available</li>
                  <li>Print-ready</li>
                </ul>
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
              ❓ Troubleshooting
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Didn't receive the email?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Check your spam/junk folder first. If it's not there, contact us with your order number.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Download link not working?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Links expire after 30 days. Contact us for a new link if needed.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  File won't open?
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Make sure you have the appropriate software (PDF reader, image viewer) installed.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '0.5rem',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '1rem'
            }}>
              📞 Need Help?
            </h2>
            <p style={{ color: '#1e40af', marginBottom: '1rem' }}>
              Our customer service team is here to help with any download issues.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                📧 Email: downloads@beelovedshouse.com
              </p>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                💬 Response time: Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalDownloads;