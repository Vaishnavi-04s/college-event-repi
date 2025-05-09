import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../services/api';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    tags: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert comma-separated tags string to array
      const eventToSubmit = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };
      await createEvent(eventToSubmit);
      history.push('/events');
    } catch (err) {
      console.error('Event creation failed:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Tags (comma-separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
