import React from 'react';

const OurStory: React.FC = () => {
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
          Our Story
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          How a simple idea became a passion for creating joy
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
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                flexShrink: 0
              }}>
                🌱
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  The Beginning
                </h2>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  It all started in a cozy kitchen in 2018, when Sarah, a mother of two, noticed how her children
                  would light up when she created personalized storybooks for them. What began as bedtime stories
                  scribbled on notebook paper soon became a passion for creating magical worlds that could transport
                  children to places of wonder and imagination.
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                flexShrink: 0
              }}>
                💡
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  The Spark of Inspiration
                </h2>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Sarah realized that every child has a unique story waiting to be told. She began creating
                  custom storybooks, coloring pages, and artwork that reflected each child's personality and dreams.
                  Word spread through local parent groups, and soon Sarah was creating magical experiences for
                  children across her community.
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                flexShrink: 0
              }}>
                🐝
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Bee Loved's House is Born
                </h2>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  In 2020, Sarah officially launched Bee Loved's House. The name came from her children's favorite
                  story about a magical bee who created worlds of wonder. Today, we create products that help
                  children feel loved, valued, and inspired. From digital wallpapers to tote bags, every item
                  carries the same magic that started in that kitchen so many years ago.
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
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Our Values
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
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
                  margin: '0 auto 0.5rem'
                }}>
                  ❤️
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Love First
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Everything we create starts with love and ends with joy.
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
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
                  margin: '0 auto 0.5rem'
                }}>
                  🎨
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Creativity
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  We believe in nurturing imagination and creative expression.
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
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
                  margin: '0 auto 0.5rem'
                }}>
                  🌱
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Growth
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Helping children grow through play, learning, and self-discovery.
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
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
                  margin: '0 auto 0.5rem'
                }}>
                  🤝
                </div>
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Community
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Building connections between families and creatives worldwide.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              Thank You
            </h2>
            <p style={{
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              To every parent, teacher, and child who has been part of our journey - thank you for believing
              in the magic of imagination. Together, we're creating a world where every child feels loved
              and empowered to dream big.
            </p>
            <p style={{
              color: '#92400e',
              fontStyle: 'italic'
            }}>
              With love,<br />
              The Bee Loved's House Family
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;