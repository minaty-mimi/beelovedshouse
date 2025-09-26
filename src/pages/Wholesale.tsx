import React, { useState } from 'react';

const Wholesale: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    monthlyOrders: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you within 2-3 business days.');
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      businessType: '',
      monthlyOrders: '',
      message: ''
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Wholesale Program
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Partner with us to bring Bee Loved's House products to your customers
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
              🌟 Why Partner With Us?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  💰
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Competitive Pricing
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Attractive wholesale discounts starting at 40% off retail prices
                </p>
              </div>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  📦
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Flexible Ordering
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Minimum orders starting at $500. Mix and match products.
                </p>
              </div>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  🚚
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Fast Shipping
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Quick processing and shipping within 2-3 business days
                </p>
              </div>
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#fce7f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  🎨
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Unique Products
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Exclusive designs that stand out in the children's market
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
              🏪 Who Can Apply?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Retail Stores
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Boutiques, toy stores, gift shops, and specialty retailers
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Online Sellers
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  E-commerce stores, marketplaces, and online retailers
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Educational Institutions
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Schools, preschools, daycares, and learning centers
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Other Businesses
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Libraries, pediatric offices, play centers, and family-oriented businesses
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
              📋 Wholesale Application
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Website (if applicable)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail Store</option>
                    <option value="online">Online Store</option>
                    <option value="educational">Educational Institution</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Estimated Monthly Orders
                </label>
                <select
                  name="monthlyOrders"
                  value={formData.monthlyOrders}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="">Select estimated volume</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Tell us about your business and why you'd like to carry our products
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}
              >
                Submit Application
              </button>
            </form>
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
              📞 Questions?
            </h2>
            <p style={{
              color: '#1e40af',
              marginBottom: '1rem'
            }}>
              Have questions about our wholesale program? We'd love to hear from you!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                📧 Email: wholesale@beelovedshouse.com
              </p>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                📞 Phone: [Your Wholesale Phone Number]
              </p>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                💬 Response time: Within 1-2 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wholesale;