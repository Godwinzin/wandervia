// src/pages/Details.jsx
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { ShowToast } from '../components/Toast';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

export default function Details() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '1';
  const destination = MOCK_DESTINATIONS.find(item => String(item.id) === String(id)) || MOCK_DESTINATIONS[0];

  // Guests tracked as a string to allow clearing/backspacing on mobile
  const [guests, setGuests] = useState('1');
  const numericGuests = Math.max(1, parseInt(guests) || 1);
  
  // Calculate the minimum check-in date (5 days from today)
  const minCheckInDate = (() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5);
    return minDate.toISOString().split('T')[0];
  })();

  // Track check-in date in state, defaulting to the 5-day minimum
  const [checkInDate, setCheckInDate] = useState(minCheckInDate);

  const [galleryImages, setGalleryImages] = useState({ img1: destination.image, img2: destination.image });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const totalPrice = destination.price * numericGuests;

  // Fetch Unsplash Images & Weather data
  useEffect(() => {
    let isMounted = true;

    async function fetchImages() {
      try {
        const fetchImg = async (query, fallback) => {
          if (!UNSPLASH_ACCESS_KEY) return fallback;
          const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
          const data = await res.json();
          return data.results?.[0]?.urls?.regular || fallback;
        };

        const [img1, img2] = await Promise.all([
          fetchImg(destination.location, destination.image),
          fetchImg(`${destination.location} travel`, destination.image)
        ]);

        if (isMounted) {
          setGalleryImages({ img1, img2 });
        }
      } catch (err) {
        console.error('Failed to fetch images', err);
      }
    }

    async function fetchWeather() {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${destination.lat}&longitude=${destination.lon}&current_weather=true`);
        const data = await res.json();
        if (isMounted) {
          setWeatherData(data.current_weather);
          setWeatherLoading(false);
        }
      } catch (err) {
        console.error('Failed to load weather', err);
        if (isMounted) setWeatherLoading(false);
      }
    }

    fetchImages();
    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [destination]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView([destination.lat, destination.lon], 12);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([destination.lat, destination.lon]).addTo(map)
      .bindPopup(`<b>${destination.title}</b><br>${destination.location}`)
      .openPopup();

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [destination]);

  // Handle Reservation Submission
  const handleReserve = (e) => {
    e.preventDefault();
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const alreadyBooked = bookings.some(b => String(b.id) === String(destination.id));
    if (alreadyBooked) {
      ShowToast(`You have already reserved a spot for ${destination.title}!`, 'info');
      return;
    }

    bookings.push({
      id: destination.id,
      bookedAt: new Date().toLocaleDateString(),
      checkInDate: checkInDate,
      guests: numericGuests,
      totalPrice: totalPrice
    });

    localStorage.setItem('bookings', JSON.stringify(bookings));
    ShowToast(`Spot successfully reserved for ${destination.title}!`, 'success');
  };

  return (
    <main className="container">
      <div className="details-layout">
        {/* Destination Information & Gallery */}
        <div>
          <h1>{destination.title}</h1>
          <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
            {destination.location} • ★ {destination.rating}
          </p>
          
          <div className="gallery">
            <img src={galleryImages.img1} alt={destination.title} />
            <img src={galleryImages.img2} alt={destination.title} />
          </div>

          <h2>About this trip</h2>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>{destination.description}</p>
          
          {/* Weather Section */}
          <div id="weather-info">
            {weatherLoading ? (
              <p>Loading current weather...</p>
            ) : weatherData ? (
              <div className="weather-card">
                <h3>Current Weather</h3>
                <p className="weather-temp">{weatherData.temperature}°C</p>
                <p>Wind Speed: {weatherData.windspeed} km/h</p>
              </div>
            ) : (
              <p>Weather data unavailable.</p>
            )}
          </div>

          {/* Leaflet Map Section */}
          <div className="map-section">
            <h2>Location & Map</h2>
            <div ref={mapRef} id="map" style={{ width: '100%', height: '320px', borderRadius: 'var(--radius)', marginTop: '1rem' }}></div>
          </div>
        </div>

        {/* Booking Widget Sidebar */}
        <div className="booking-widget">
          <h3>Reserve Your Spot</h3>
          <p className="card-price" id="widget-price" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
            ${totalPrice} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--gray)' }}>({numericGuests} {numericGuests > 1 ? 'guests' : 'guest'})</span>
          </p>

          <form onSubmit={handleReserve} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="checkin" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Check-in Date</label>
              <input 
                type="date" 
                id="checkin" 
                value={checkInDate}
                min={minCheckInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                required 
              />
            </div>

            <div>
              <label htmlFor="guests" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Guests</label>
              <input 
                type="number" 
                id="guests" 
                min="1" 
                max="10" 
                inputMode="numeric"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onBlur={() => {
                  if (!guests || parseInt(guests) < 1) {
                    setGuests('1');
                  }
                }}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                required 
              />
            </div>

            <button type="submit" id="reserve-btn" className="btn-primary" style={{ padding: '0.75rem', borderRadius: 'var(--radius)', fontWeight: 'bold', cursor: 'pointer' }}>
              Reserve Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}