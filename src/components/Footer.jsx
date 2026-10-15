// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png'

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
          <h4>Connect With Us</h4>
          
          <div className="contact-item">
            <span>WhatsApp:</span>
            <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer">+254712345678</a>
          </div>
          <div className="contact-item">
            <span>Email:</span>
            <a href="mailto:support@wandervia.com">support@wandervia.com</a>
          </div>

          <div className="social-links">
            <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
              <MessageCircle size={20} />
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

            {/* X / Twitter SVG */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
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