import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { ShowToast } from '../components/Toast';

export default function Saved() {
  const [, setRefreshKey] = useState(0);

  // Read favorite IDs from localStorage using the 'favorites' key
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const savedItems = MOCK_DESTINATIONS.filter(item => favorites.includes(item.id));

  const handleToggleSave = (item) => {
    let currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    currentFavorites = currentFavorites.filter(favId => favId !== item.id);
    
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
    ShowToast(`Removed "${item.title}" from favorites`, 'info');
    
    // Force component re-render so the card disappears from the grid immediately
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="container">
      <h2 className="section-title">Favorite Destinations</h2>
      <div className="grid" id="saved-results">
        {savedItems.length > 0 ? (
          savedItems.map(item => (
            <DestinationCard 
              key={item.id} 
              item={item} 
              isSaved={true} // Everything on the Saved page is a favorite
              onToggleSave={handleToggleSave} 
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