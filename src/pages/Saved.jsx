// src/pages/Saved.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function Saved() {
  // State to trigger re-renders when favorites are modified
  const [, setRefreshKey] = useState(0);

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const savedItems = MOCK_DESTINATIONS.filter(item => favorites.includes(item.id));

  const handleFavoriteToggle = () => {
    // Force component re-render when a favorite is toggled
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="container">
      <h2 className="section-title">Saved Favorites</h2>
      <div className="grid" id="saved-results">
        {savedItems.length > 0 ? (
          savedItems.map(item => (
            <DestinationCard 
              key={item.id} 
              item={item} 
              onFavoriteToggle={handleFavoriteToggle} 
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              You haven't saved any destinations yet. Click the heart icon on any card to save it here!
            </p>
            <Link 
              to="/search" 
              className="btn-primary" 
              style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', display: 'inline-block', borderRadius: 'var(--radius)' }}
            >
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}