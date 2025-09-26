import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          About Bee Loved's House
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Creating magical moments through creativity and imagination
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
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🐝
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                textAlign: 'center'
              }}>
                Our Story
              </h2>
            </div>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              fontSize: '1.125rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              Bee Loved's House was born from a simple belief: every child deserves to feel loved, cherished, and inspired.
              What started as a small collection of handmade storybooks has grown into a magical world of creativity,
              where imagination knows no bounds.
            </p>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              fontSize: '1.125rem',
              textAlign: 'center'
            }}>
              We create products that spark joy, encourage creativity, and create lasting memories.
              From whimsical storybooks to beautiful digital wallpapers, every item in our collection
              is designed with love and crafted with care.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem'
              }}>
                ❤️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Made with Love
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Every product is created with the utmost care and attention to detail,
                ensuring quality that lasts.
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem'
              }}>
                🌈
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Spark Imagination
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Our designs encourage creativity and help children explore their
                imagination through play and learning.
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem'
              }}>
                🌍
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Eco-Friendly
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                We prioritize sustainable materials and practices to protect
                our planet for future generations.
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
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Our Mission
            </h2>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{
                color: '#374151',
                lineHeight: '1.6',
                fontSize: '1.125rem',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                "To create a world where every child feels loved, valued, and empowered through creativity.
                We believe that imagination is the foundation of innovation, and every child deserves tools
                that help them dream big and achieve their goals."
              </p>
              <p style={{
                color: '#6b7280',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                - The Bee Loved's House Team
              </p>
            </div>
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
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Join Our Family
            </h2>
            <p style={{
              color: '#92400e',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              Become part of our community of parents, educators, and creatives who share our passion
              for nurturing young minds.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Follow on Instagram
              </button>
              <button style={{
                backgroundColor: 'transparent',
                color: '#92400e',
                border: '2px solid #f59e0b',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;