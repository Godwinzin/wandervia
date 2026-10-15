// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';

import Home from './pages/Home';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Bookings from './pages/Bookings';
import Details from './pages/Details';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/details" element={<Details />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}