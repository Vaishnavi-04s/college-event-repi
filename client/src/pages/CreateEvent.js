import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';
import EventForm from '../components/EventForm';



const CreateEvent = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    tags: '',
    googleFormLink: '',
  });
  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (poster) formData.append('poster', poster);

    // Get token from localStorage
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      alert('🎉 Event created successfully!');
      setForm({ name: '', date: '', description: '', location: '', tags: '', googleFormLink: '' });
      setPoster(null);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create event.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Google Form URL</label>
          <input type="url" name="googleFormLink" value={form.googleFormLink} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Upload Poster</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};


export default CreateEvent;
