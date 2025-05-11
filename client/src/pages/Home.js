import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const history = useHistory();

  return (
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
        </div>
      </div>
    </div>
  );
};

export default Home;
