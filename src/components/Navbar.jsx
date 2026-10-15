import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo-link" onClick={closeMenu}>
        <img src={logo} alt="Wandervia Logo" className="logo-img" />
        <span className="logo-text">Wandervia</span>
      </NavLink>
      
      {/* Mobile Hamburger Button */}
      <button 
        className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`} 
        id="hamburger-btn" 
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'navactive' : ''} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'navactive' : ''} onClick={closeMenu}>
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved" className={({ isActive }) => isActive ? 'navactive' : ''} onClick={closeMenu}>
            Saved
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? 'navactive' : ''} onClick={closeMenu}>
            My Bookings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}