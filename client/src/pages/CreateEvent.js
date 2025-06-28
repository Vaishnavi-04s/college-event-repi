import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
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
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
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
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    }
  };

  return (
<<<<<<< HEAD
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
=======
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

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
export default CreateEvent;
