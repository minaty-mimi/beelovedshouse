import React, { useState } from 'react';

const AffiliateProgram: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    socialMedia: '',
    audience: '',
    experience: '',
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
    alert('Thank you for your interest in our affiliate program! We will review your application and contact you within 3-5 business days.');
    setFormData({
      name: '',
      email: '',
      website: '',
      socialMedia: '',
      audience: '',
      experience: '',
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
          Affiliate Program
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Join our affiliate family and earn commissions promoting products you love
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
              💰 Earn Money Sharing What You Love
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
                  💸
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  15% Commission
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Earn 15% on every sale generated through your unique affiliate link
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
                  ⏰
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Monthly Payouts
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Get paid monthly via PayPal, direct deposit, or check (minimum $25)
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
                  🎁
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Free Products
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Receive free products to review and feature in your content
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
                  📊
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Real-Time Tracking
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Track your clicks, conversions, and earnings in real-time
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
              🎯 Who Should Apply?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Bloggers & Content Creators
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Lifestyle, parenting, education, or children's product bloggers
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Social Media Influencers
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Instagram, TikTok, YouTube, or Pinterest creators with family/parenting audiences
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Parenting Communities
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Facebook groups, forums, or parenting websites and newsletters
                </p>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  Educators & Childcare Providers
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Teachers, daycare owners, and early childhood education professionals
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
              📋 Affiliate Application
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Website/Blog URL
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
                    Social Media Handles
                  </label>
                  <input
                    type="text"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleChange}
                    placeholder="Instagram, TikTok, etc."
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
                    Audience Size
                  </label>
                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select audience size</option>
                    <option value="1k-5k">1K - 5K followers</option>
                    <option value="5k-10k">5K - 10K followers</option>
                    <option value="10k-50k">10K - 50K followers</option>
                    <option value="50k-100k">50K - 100K followers</option>
                    <option value="100k+">100K+ followers</option>
                  </select>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Affiliate Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select experience level</option>
                    <option value="none">No experience</option>
                    <option value="beginner">Beginner (less than 1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
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
                  Tell us about yourself and why you'd be a great affiliate partner *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
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
                  backgroundColor: '#10b981',
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
                Apply Now
              </button>
            </form>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              📚 Affiliate Resources
            </h2>
            <p style={{
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              Once approved, you'll get access to marketing materials, product images, email templates,
              and promotional codes to help you succeed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                🎨 <strong>Marketing Materials:</strong> Banners, product images, and social media graphics
              </p>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                📧 <strong>Email Templates:</strong> Pre-written promotional emails and newsletters
              </p>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                💬 <strong>Support:</strong> Dedicated affiliate manager and monthly webinars
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
              ❓ Questions?
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              Have questions about our affiliate program? We're here to help!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#6b7280' }}>
                📧 Email: affiliates@beelovedshouse.com
              </p>
              <p style={{ color: '#6b7280' }}>
                📞 Phone: [Your Affiliate Phone Number]
              </p>
              <p style={{ color: '#6b7280' }}>
                💬 Response time: Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;