import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    tags: [],
  });
  const [message, setMessage] = useState('');

  // Fetch events
const fetchEvents = async () => {
  const token = localStorage.getItem('token');
  console.log(token);  // Get token from localStorage
  if (!token) {
    setMessage('You must be logged in to view events.');
    return;
  }

  try {
    const res = await axios.get('http://localhost:5000/api/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEvents(res.data);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    setMessage('Failed to fetch events');
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'tags') {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setEventData({ ...eventData, tags: selected });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      setMessage('You must be logged in to create an event.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/events', eventData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token here too
        },
      });
      setMessage('Event created successfully!');
      setEventData({ name: '', date: '', description: '', location: '', tags: [] });
      fetchEvents();  // Refresh the list of events
    } catch (err) {
      console.error('Axios Error:', err);
      if (err.response) {
        setMessage(`Failed: ${err.response.data.message || 'Unknown error'}`);
      } else {
        setMessage('An error occurred while creating the event');
      }
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Event Name</label>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Event Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Tags</label>
        <select
          multiple
          name="tags"
          value={eventData.tags}
          onChange={handleChange}
          style={{ ...styles.input, height: '100px' }}
        >
          <option value="Coding">Coding</option>
          <option value="AI">AI</option>
          <option value="Robotics">Robotics</option>
          <option value="IOT">IOT</option>
          <option value="Sports">Sports</option>
        </select>

        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('failed') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <h3 style={{ marginTop: '40px' }}>All Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id} style={styles.eventItem}>
            <strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
};

export default AdminDashboard;
