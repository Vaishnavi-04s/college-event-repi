import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import CSS

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

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
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

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to create an event.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/events', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Event created successfully!');
      setEventData({ name: '', date: '', description: '', location: '', tags: [] });
      fetchEvents();
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
    <div className="container">
      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit} className="form">
        <label className="label">Event Name</label>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
          className="input"
        />

        <label className="label">Event Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="input"
        />

        <label className="label">Description</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="textarea"
        />

        <label className="label">Location</label>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          className="input"
        />

        <label className="label">Tags</label>
        <select
          multiple
          name="tags"
          value={eventData.tags}
          onChange={handleChange}
          className="input"
          style={{ height: '100px' }}
        >
          <option value="Coding">Coding</option>
          <option value="AI">AI</option>
          <option value="Robotics">Robotics</option>
          <option value="IOT">IOT</option>
          <option value="Sports">Sports</option>
        </select>

        <button type="submit" className="button">
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
          <li key={event._id} className="eventItem">
            <strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
