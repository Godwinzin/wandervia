// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Wandervia Icon" className="logo-img" />
            <span className="logo-text">Wandervia</span>
          </Link>
          <p style={{ marginTop: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
            Discover and reserve your next adventure seamlessly.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/saved">Saved</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support & Legal</h4>
          <ul>
            <li><Link to="/legal?tab=faq">FAQs</Link></li>
            <li><Link to="/legal?tab=privacy">Privacy Policy</Link></li>
            <li><Link to="/legal?tab=terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect With Us</h4>
          
          <div className="contact-item">
            <span>Phone / WhatsApp:</span>
            <a href="tel:+254712345678">+254712345678</a>
          </div>
          <div className="contact-item">
            <span>Email:</span>
            <a href="mailto:support@wandervia.com">support@wandervia.com</a>
          </div>

          <div className="social-links">
            {/* Phone Call Link */}
            <a href="tel:+254712345678" aria-label="Call Us" className="social-icon" title="Call Us">
              <Phone size={20} />
            </a>

            {/* WhatsApp SVG */}
            <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon" title="Chat on WhatsApp">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            {/* Facebook SVG */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Instagram SVG */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Official X Logo SVG */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon" title="X (Twitter)">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Wandervia. All rights reserved.</p>
      </div>
    </footer>
  );
}