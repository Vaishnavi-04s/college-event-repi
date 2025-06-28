import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditEventPage.css';

const EditEventPage = ({ match, history }) => {
  const eventId = match.params.id;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    tags: '',
    googleFormLink: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // fetch event details on mount
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const event = res.data;
        setFormData({
          name: event.name,
          description: event.description,
          date: event.date.slice(0, 10), // format for input date
          location: event.location,
          tags: event.tags.join(', '),
          googleFormLink: event.googleFormLink || '',
        });
      } catch (err) {
        setError('Failed to load event data.');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/events/${eventId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage();
      // Optional: clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update event. Please try again.');
    }
  };

  return (
    <div className="edit-event-page">
      <h2>Edit Event</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="googleFormLink"
          placeholder="Google Form Link"
          value={formData.googleFormLink}
          onChange={handleChange}
        />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};
<button
  type="button"
  className="delete-button"
  onClick={async () => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event deleted successfully!");
      history.push('/admin-dashboard'); // redirect after delete
    } catch (err) {
      toast.error("Failed to delete event.");
    }
  }}
>
  Delete Event
</button>


export default EditEventPage;
