import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { ShowToast } from '../components/Toast';

export default function Home() {
  const [destinationQuery, setDestinationQuery] = useState('');
  
  // Lazy initialization for saved items
  const [savedIds, setSavedIds] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('savedDestinations')) || [];
    return saved.map(item => item.id);
  });

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(destinationQuery)}`);
  };

  const handleToggleSave = (item) => {
    let saved = JSON.parse(localStorage.getItem('savedDestinations')) || [];
    const exists = saved.some(fav => fav.id === item.id);

    if (exists) {
      saved = saved.filter(fav => fav.id !== item.id);
      setSavedIds(savedIds.filter(id => id !== item.id));
      ShowToast(`Removed ${item.title} from saved`, 'info');
    } else {
      saved.push(item);
      setSavedIds([...savedIds, item.id]);
      ShowToast(`Added ${item.title} to saved!`, 'success');
    }

    localStorage.setItem('savedDestinations', JSON.stringify(saved));
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