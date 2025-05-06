import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>College Event Organizer</h1>
      <p style={styles.description}>
        Welcome to the College Event Organizer Web App! <br />
        Stay updated with all upcoming college events based on your interests. <br />
        Organizers (Heads) can post new events, and registered students will receive personalized notifications.
      </p>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => history.push('/login')}>Login</button>
        <button style={styles.button} onClick={() => history.push('/register')}>Register</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px'
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    padding: '0 20px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  button: {
    padding: '10px 25px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Home;
