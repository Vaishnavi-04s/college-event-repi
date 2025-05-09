import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  // Track hover state for buttons to apply hover styles dynamically
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>College Event Organizer</h1>
        <p style={styles.description}>
          Welcome to the College Event Organizer Web App! <br />
          Stay updated with all upcoming college events based on your interests. <br />
          Organizers (Heads) can post new events, and registered students will receive personalized notifications.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={hoveredButton === 'login' ? {...styles.button, ...styles.buttonHoverLogin} : styles.button}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => history.push('/login')}
          >
            Login
          </button>

          <button
            style={hoveredButton === 'register' ? {...styles.button, ...styles.buttonHoverRegister} : styles.button}
            onMouseEnter={() => setHoveredButton('register')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => history.push('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.3rem',
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
  },
  button: {
    flex: 1,
    padding: '12px 0',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  buttonHoverLogin: {
    backgroundColor: '#4caf50',
    boxShadow: '0 8px 20px #4caf50',
    transform: 'translateY(-3px)',
  },
  buttonHoverRegister: {
    backgroundColor: '#ff5722',
    boxShadow: '0 8px 20px #ff5722',
    transform: 'translateY(-3px)',
  },
  buttonLogin: {
    backgroundColor: '#43a047',
  },
  buttonRegister: {
    backgroundColor: '#e64a19',
  },
};

export default Home;
