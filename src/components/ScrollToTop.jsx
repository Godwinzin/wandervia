import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const { pathname } = useLocation();

  // 1. Handle page title updates and auto-scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Page Titles based on path
    switch (pathname) {
      case '/':
        document.title = 'Wandervia | Home - Discover Your Next Adventure';
        break;
      case '/search':
        document.title = 'Wandervia | Explore Destinations';
        break;
      case '/saved':
        document.title = 'Wandervia | Saved Favorites';
        break;
      case '/bookings':
        document.title = 'Wandervia | My Bookings';
        break;
      default:
        if (pathname.includes('/details')) {
          document.title = 'Wandervia | Destination Details';
        } else {
          document.title = 'Wandervia | Travel & Exploration';
        }
    }
  }, [pathname]);

  // 2. Track scroll depth for the button's appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / 300, 1);
      setScrollOpacity(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Custom smooth scroll loop so you can visibly watch the page glide up
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 600; // Duration in milliseconds (increase this to make it scroll slower and more visibly)
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      // Easing function for a smooth slow-down effect near the top
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      window.scrollTo(0, startPosition * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <button 
      onClick={scrollToTop} 
      className="scroll-to-top-btn"
      title="Scroll to top"
      aria-label="Scroll to top"
      style={{
        opacity: scrollOpacity,
        visibility: scrollOpacity === 0 ? 'hidden' : 'visible',
        transform: `translateY(${(1 - scrollOpacity) * 15}px)`
      }}
    >
      ↑
    </button>
  );
}