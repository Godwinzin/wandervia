// src/pages/Bookings.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { ShowToast } from '../components/Toast';

export default function Bookings() {
  const [, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  const bookedIds = bookings.map(b => String(b.id));

  const bookedItems = MOCK_DESTINATIONS.filter(item => 
    bookedIds.includes(String(item.id))
  );

  const handleCancelBooking = (e, id, title) => {
    e.stopPropagation();
    e.preventDefault();

    // 1. Remove from localStorage
    let updatedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    updatedBookings = updatedBookings.filter(b => String(b.id) !== String(id));
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // 2. Trigger re-render
    setRefreshKey(prev => prev + 1);

    // 3. Feedback Toast
    ShowToast(`Reservation for "${title}" cancelled`, 'info');
  };

  const handleCardClick = (id) => {
    navigate(`/details?id=${id}`);
  };

  return (
    <main className="container">
      <h2 className="section-title">My Bookings</h2>
      <div className="grid" id="bookings-results">
        {bookedItems.length > 0 ? (
          bookedItems.map(item => {
            const bookingInfo = bookings.find(b => String(b.id) === String(item.id));
            const guests = bookingInfo && bookingInfo.guests ? bookingInfo.guests : 1;
            const displayPrice = bookingInfo && bookingInfo.totalPrice ? bookingInfo.totalPrice : item.price;

            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="card" onClick={() => handleCardClick(item.id)}>
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
                    <span className="status-badge">Confirmed</span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p style={{ color: 'var(--gray)' }}>{item.location}</p>
                    <div style={{ margin: '0.4rem 0', fontSize: '0.85rem', color: '#555', background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                      <strong>Reserved:</strong> {bookingInfo ? bookingInfo.bookedAt : 'Recently'} • <strong>{guests} {guests > 1 ? 'Guests' : 'Guest'}</strong>
                    </div>
                    <p className="card-price">
                      ${displayPrice} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--gray)' }}>/ total</span>
                    </p>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={(e) => handleCancelBooking(e, item.id, item.title)} 
                  style={{ backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0.5rem', width: '100%', cursor: 'pointer', border: 'none' }}
                >
                  Cancel Reservation
                </button>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>You have no active reservations yet.</p>
            <Link 
              to="/" 
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