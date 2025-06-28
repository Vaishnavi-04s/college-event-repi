import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const history = useHistory();

  return (
<<<<<<< HEAD
    <div className="home-hero">
      <nav className="navbar">
        <ul className="nav-links">
          <li>Home</li>
          <li>About Us</li>
        
          <li onClick={() => history.push('/events')}>Events</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className="hero-content">
        <div className="left-content">
          <p className="tagline">🎓 Welcome to</p>
          <h1 className="main-heading">
            College <span className="highlight">Event Organizer</span>
          </h1>
          <p className="description">
            A smarter way to connect students and events on campus.
Browse, register, and get notified for events that match your interests — all in one place.
          </p>
          <div className="buttons">
            <button className="book-btn" onClick={() => history.push('/register')}>Sign Up</button>
            <button className="see-btn" onClick={() => history.push('/login')}>Login</button>
          </div>
        </div>

        <div className="right-content">
          <img src="/hero-bg.jpg" alt="College" className="hero-image-full" />
=======
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">College Event Organizer</h1>
        <p className="home-description">
          Welcome to the College Event Organizer Web App! <br />
          Stay updated with all upcoming college events based on your interests. <br />
          Organizers (Heads) can post new events, and registered students will receive personalized notifications.
        </p>

        <div className="home-button-container">
          <button
            className="home-button login"
            onClick={() => history.push('/login')}
          >
            Login
          </button>

          <button
            className="home-button register"
            onClick={() => history.push('/register')}
          >
            Register
          </button>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        </div>
      </div>
    </div>
  );
};

export default Home;
