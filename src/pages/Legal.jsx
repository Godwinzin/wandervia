// src/pages/Legal.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Legal() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'faq';

  // Force scroll to top whenever the legal page or tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  return (
    <main className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
      {tab === 'faq' && (
        <div>
          <h1>Frequently Asked Questions</h1>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div>
              <h3>How do I save a destination to my favorites?</h3>
              <p style={{ color: 'var(--gray)', marginTop: '0.3rem' }}>
                Simply click the heart icon on any destination card while browsing the home page or search results. Your favorites are saved instantly to your browser.
              </p>
            </div>

            <div>
              <h3>Are the bookings and payments real?</h3>
              <p style={{ color: 'var(--gray)', marginTop: '0.3rem' }}>
                No, Wandervia is a simulated travel exploration portfolio project. All reservations and bookings are safely stored in your local browser storage for demonstration purposes only.
              </p>
            </div>

            <div>
              <h3>How do I change my check-in date?</h3>
              <p style={{ color: 'var(--gray)', marginTop: '0.3rem' }}>
                When viewing any destination's details page, you can use the interactive date picker widget on the right sidebar to select any check-in date starting from 5 days in the future.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'privacy' && (
        <div>
          <h1>Privacy Policy</h1>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          <p style={{ color: 'var(--gray)', lineHeight: '1.6', marginTop: '1.5rem' }}>
            At Wandervia, your privacy is respected. Because this is a client-side web application, we do not collect, track, store, or sell any personal data on external servers. All user preferences, saved favorites, and mock bookings are stored strictly within your browser's local storage (`localStorage`) and remain completely under your control.
          </p>
        </div>
      )}

      {tab === 'terms' && (
        <div>
          <h1>Terms & Conditions</h1>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          <p style={{ color: 'var(--gray)', lineHeight: '1.6', marginTop: '1.5rem' }}>
            By accessing and using Wandervia, you acknowledge that this is a conceptual portfolio application. All destination details, pricing, weather data, and mock reservation features are provided for demonstration purposes. Wandervia assumes no legal liability for simulated transactions or outdated third-party widget data.
          </p>
        </div>
      )}
    </main>
  );
}