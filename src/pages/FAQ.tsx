import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How do I download digital products?",
      answer: "After purchase, you'll receive an email with download links. You can also access your downloads from your account dashboard."
    },
    {
      question: "What file formats are included?",
      answer: "Digital wallpapers come in multiple formats (PNG, JPG, PDF). Books are available as PDF files. All products are high-resolution."
    },
    {
      question: "Can I return physical products?",
      answer: "Yes, we accept returns within 30 days of delivery. Items must be in original condition. See our Returns page for full details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. Check our Shipping Info page for details."
    },
    {
      question: "Are your products suitable for children?",
      answer: "Yes! Our products are designed with children in mind. Storybooks and coloring books are age-appropriate and educational."
    },
    {
      question: "How long do downloads take to arrive?",
      answer: "Digital products are delivered instantly via email. Physical products typically ship within 1-3 business days."
    },
    {
      question: "Can I get a refund for digital products?",
      answer: "Due to the nature of digital products, we don't offer refunds once downloaded. Please contact us if you have technical issues."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer wholesale pricing for bulk orders. Contact us for a custom quote."
    }
  ];

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
          Frequently Asked Questions
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Find answers to common questions about our products and services
        </p>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              borderBottom: index < faqs.length - 1 ? '1px solid #e5e7eb' : 'none'
            }}>
              <button
                onClick={() => toggleItem(index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none'
                }}
              >
                <span style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  color: '#6b7280',
                  transform: openItems.includes(index) ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>
                  +
                </span>
              </button>
              {openItems.includes(index) && (
                <div style={{
                  padding: '0 1.5rem 1.5rem 1.5rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Still have questions?
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '1.5rem'
          }}>
            Can't find what you're looking for? We're here to help!
          </p>
          <button style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none'
          }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;