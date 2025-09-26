import React from 'react';

const PrivacyPolicy: React.FC = () => {
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
          Privacy Policy
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Last updated: December 2024
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
              🔒 Our Commitment to Privacy
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              At Bee Loved's House, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
            </p>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              We believe in transparency and only collect information necessary to provide you with the best possible experience
              while shopping with us.
            </p>
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
              📊 Information We Collect
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Personal Information
                </h3>
                <ul style={{
                  color: '#6b7280',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  <li>Name and contact information (email, phone number)</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Automatically Collected Information
                </h3>
                <ul style={{
                  color: '#6b7280',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Device information</li>
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
              🎯 How We Use Your Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Order Processing
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  To process and fulfill your orders, arrange shipping, and provide customer service.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Communication
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  To send order confirmations, shipping updates, and respond to your inquiries.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Website Improvement
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  To analyze website usage and improve our products and services.
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
              🔐 Information Security
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              We implement appropriate technical and organizational security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div style={{
              backgroundColor: '#dcfce7',
              border: '1px solid #16a34a',
              borderRadius: '0.375rem',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <p style={{ color: '#166534', fontWeight: '500' }}>
                ✅ <strong>Secure Payments:</strong> All payment information is processed through encrypted, PCI-compliant gateways.
              </p>
            </div>
            <div style={{
              backgroundColor: '#dbeafe',
              border: '1px solid #2563eb',
              borderRadius: '0.375rem',
              padding: '1rem'
            }}>
              <p style={{ color: '#1e40af', fontWeight: '500' }}>
                🔒 <strong>Data Encryption:</strong> Your personal information is encrypted both in transit and at rest.
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
              🍪 Cookies and Tracking
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic,
              and personalize content. You can control cookie preferences through your browser settings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>Essential Cookies:</strong> Required for website functionality
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>Analytics Cookies:</strong> Help us understand how you use our site
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>Marketing Cookies:</strong> Used to show relevant advertisements
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
              📧 Your Rights
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              You have the right to access, update, or delete your personal information. You can also opt out
              of marketing communications at any time.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                  Access Your Data
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  Request a copy of your personal information
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                  Update Information
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  Correct or update your personal details
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                  Delete Data
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  Request deletion of your information
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              📞 Contact Us
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#6b7280' }}>
                📧 Email: privacy@beelovedshouse.com
              </p>
              <p style={{ color: '#6b7280' }}>
                📮 Address: Bee Loved's House, Privacy Department, [Your Address]
              </p>
              <p style={{ color: '#6b7280' }}>
                📞 Phone: [Your Phone Number]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;