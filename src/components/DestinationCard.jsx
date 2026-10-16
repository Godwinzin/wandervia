import { useNavigate } from 'react-router-dom';

export default function DestinationCard({ item, isSaved, onToggleSave }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details?id=${item.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click from triggering navigation

    if (onToggleSave) {
      onToggleSave(item);
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
          className={`fav-btn ${isSaved ? 'active' : ''}`} 
          onClick={handleFavoriteClick} 
          title={isSaved ? "Remove from Favorites" : "Save to Favorites"}
          aria-label={isSaved ? "Remove from Favorites" : "Save to Favorites"}
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