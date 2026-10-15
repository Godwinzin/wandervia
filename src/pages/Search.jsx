// src/pages/Search.jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Compute filtered destinations directly during render (No useEffect needed!)
  const filteredDestinations = MOCK_DESTINATIONS.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = item.price <= maxPrice;
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <main className="container">
      <div className="search-layout">
        {/* Sidebar Filters */}
        <aside className="filters">
          <h3>Filter Results</h3>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          
          <div className="filter-group">
            <label htmlFor="price-range">Max Price ($)</label>
            <input 
              type="range" 
              id="price-range" 
              min="100" 
              max="2000" 
              step="50" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <output>${maxPrice}</output>
          </div>

          <div className="filter-group">
            <label>Category</label>
            {['Beach', 'Mountain', 'City'].map((cat) => (
              <label key={cat}>
                <input 
                  type="checkbox" 
                  className="category-filter" 
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                /> {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* Results Grid */}
        <section>
          <h2 id="search-title">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Showing All Destinations'}
          </h2>
          <br />
          <div className="grid" id="search-results">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(item => (
                <DestinationCard key={item.id} item={item} />
              ))
            ) : (
              <p>No destinations found matching your criteria.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}