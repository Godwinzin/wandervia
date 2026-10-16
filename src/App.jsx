// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Bookings from './pages/Bookings';
import Details from './pages/Details';
import Legal from './pages/Legal';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="app-wrapper">
        <Navbar />
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Saved />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/details" element={<Details />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}