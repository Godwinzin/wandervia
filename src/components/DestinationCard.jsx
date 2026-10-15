import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowToast } from './Toast';

export default function DestinationCard({ item, onFavoriteToggle }) {
  const navigate = useNavigate();

  // ✅ Use local state initialized from localStorage so it updates instantly
  const [isFav, setIsFav] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(item.id);
  });

  const handleCardClick = () => {
    navigate(`/details?id=${item.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click event from firing

    let updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (updatedFavorites.includes(item.id)) {
      updatedFavorites = updatedFavorites.filter(favId => favId !== item.id);
      setIsFav(false); // ✅ Instantly update local state
      ShowToast(`Removed "${item.title}" from saved favorites`, 'info');
    } else {
      updatedFavorites.push(item.id);
      setIsFav(true); // ✅ Instantly update local state
      ShowToast(`Added "${item.title}" to saved favorites!`, 'success');
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Notify parent component if a callback was passed (useful for Saved page re-rendering)
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div style={{ position: 'relative' }}>
        <img 
          src={item.image} 
          alt={item.title} 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`} 
          onClick={handleFavoriteClick} 
          title="Save to Favorites"
        >
          ♥
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p style={{ color: 'var(--gray)' }}>{item.location}</p>
        <p className="card-price">
          ${item.price} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--gray)' }}>/ total</span>
        </p>
      </div>
    </div>
  );
}