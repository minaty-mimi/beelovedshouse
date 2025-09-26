import React from 'react';

const TermsOfService: React.FC = () => {
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
          Terms of Service
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
              📋 Agreement to Terms
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              By accessing and using Bee Loved's House website and services, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our website or services.
            </p>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              These terms apply to all visitors, users, and customers of our website and services.
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
              🛒 Use of Our Services
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Eligibility
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  You must be at least 18 years old or have parental consent to use our services.
                  By using our website, you represent that you meet these requirements.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Account Responsibility
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  You are responsible for maintaining the confidentiality of your account information
                  and for all activities that occur under your account.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Prohibited Uses
                </h3>
                <ul style={{
                  color: '#6b7280',
                  paddingLeft: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6'
                }}>
                  <li>Using our services for any illegal purpose</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with the proper functioning of our website</li>
                  <li>Using automated tools to access our services</li>
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
              🛍️ Orders and Payment
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Order Acceptance
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  All orders are subject to acceptance and availability. We reserve the right to refuse
                  or cancel any order for any reason.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Pricing and Payment
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  All prices are subject to change without notice. Payment is due at the time of order.
                  We accept major credit cards and other payment methods as indicated on our website.
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Taxes
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  You are responsible for all applicable taxes. Tax amounts will be calculated and added
                  to your order total at checkout.
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
              📦 Shipping and Delivery
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Shipping times and costs are clearly displayed during checkout. We are not responsible for delays
              caused by factors beyond our control, including but not limited to weather, carrier issues, or customs delays.
            </p>
            <div style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '0.375rem',
              padding: '1rem'
            }}>
              <p style={{ color: '#92400e', fontWeight: '500' }}>
                ⚠️ <strong>International Shipping:</strong> Additional customs fees, duties, or taxes may apply
                for international orders. These are the responsibility of the recipient.
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
              🔄 Returns and Refunds
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Please refer to our Returns Policy for detailed information about returns, exchanges, and refunds.
              Digital products are generally not eligible for returns unless there's a technical issue.
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
                  Physical Items
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  30-day return window
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                  Digital Items
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  No returns (see exceptions)
                </p>
              </div>
              <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                  Refunds
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                  Processed within 3-5 days
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
              🛡️ Intellectual Property
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              All content on our website, including text, graphics, logos, images, and software, is owned by
              Bee Loved's House or our licensors and is protected by copyright and other intellectual property laws.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>Personal Use:</strong> You may use our content for personal, non-commercial purposes only.
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>Commercial Use:</strong> Written permission required for any commercial use of our content.
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                <strong>User Content:</strong> By submitting content to us, you grant us a non-exclusive license to use it.
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
              ⚖️ Limitation of Liability
            </h2>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Bee Loved's House shall not be liable for any indirect, incidental, special, or consequential damages
              arising out of or in connection with your use of our services.
            </p>
            <div style={{
              backgroundColor: '#dbeafe',
              border: '1px solid #2563eb',
              borderRadius: '0.375rem',
              padding: '1rem'
            }}>
              <p style={{ color: '#1e40af', fontWeight: '500' }}>
                💡 <strong>Important:</strong> Our total liability to you for any claims arising from your use of our services
                shall not exceed the amount you paid for the products or services in question.
              </p>
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
              📞 Contact Information
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#6b7280' }}>
                📧 Email: legal@beelovedshouse.com
              </p>
              <p style={{ color: '#6b7280' }}>
                📮 Address: Bee Loved's House, Legal Department, [Your Address]
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

export default TermsOfService;