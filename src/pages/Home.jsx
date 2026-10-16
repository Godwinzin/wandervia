import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { ShowToast } from '../components/Toast';

export default function Home() {
  const [destinationQuery, setDestinationQuery] = useState('');
  
  // Use 'favorites' for consistency across the app
  const [savedIds, setSavedIds] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites; // Since favorites stores just IDs, or update if it stores objects
  });

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(destinationQuery)}`);
  };

  const handleToggleSave = (item) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.includes(item.id);

    if (exists) {
      favorites = favorites.filter(favId => favId !== item.id);
      setSavedIds(favorites);
      ShowToast(`Removed "${item.title}" from favorites`, 'info');
    } else {
      favorites.push(item.id);
      setSavedIds([...favorites]);
      ShowToast(`Added "${item.title}" to favorites!`, 'success');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <>
      <header className="hero">
        <h1>Discover Your Next Adventure</h1>
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            id="destination-input" 
            placeholder="Where do you want to go?" 
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </header>

      <main className="container">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="grid" id="popular-destinations">
          {MOCK_DESTINATIONS.map((item) => (
            <DestinationCard 
              key={item.id} 
              item={item} 
              isSaved={savedIds.includes(item.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      </main>
    </>
  );
}