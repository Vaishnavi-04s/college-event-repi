<<<<<<< HEAD
// EventForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ initialData = {}, isEditing = false, eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    tags: [],
    poster: null,
    ...initialData,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        ...initialData,
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, poster: e.target.files[0] }));
=======
/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    venue: '',
    location: '',
    category: 'AI'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const token = localStorage.getItem('token');
    const data = new FormData();

    for (let key in formData) {
      if (key === 'tags') {
        formData.tags.forEach(tag => data.append('tags[]', tag));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (isEditing) {
        await axios.put(`/api/events/${eventId}`, data, config);
        alert("✅ Event updated successfully!");
      } else {
        await axios.post('/api/events', data, config);
        alert("🎉 Event created successfully!");
      }
    } catch (err) {
      console.error("❌ Error submitting event:", err);
      alert("Something went wrong.");
=======
    try {
      await createEvent(formData);
      navigate('/events');
    } catch (err) {
      console.error(err);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="form">
      <label>Event Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Event Date</label>
      <input type="date" name="date" value={formData.date?.slice(0,10)} onChange={handleChange} required />

      <label>Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <label>Location</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} required />

      <label>Tags (comma separated)</label>
      <input type="text" name="tags" value={formData.tags.join(',')} onChange={handleTagsChange} />

      <label>Poster</label>
      <input type="file" name="poster" onChange={handleFileChange} />

      <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
=======
    <div className="event-form">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="AI">AI</option>
            <option value="Robotics">Robotics</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm; 

import React from 'react';
import './EventForm.css'; // Optional: Create separate styles or reuse AdminDashboard.css

const EventForm = ({ eventData, handleChange, handleSubmit }) => {
  return (
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
  );
};

export default EventForm; */

import React from 'react';
import './EventForm.css'; // Optional: Create separate styles or reuse AdminDashboard.css

const EventForm = ({ eventData, handleChange, handleSubmit, isEdit }) => {
  return (
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
        {isEdit ? 'Update Event' : 'Create Event'} {/* Change button text based on isEdit */}
      </button>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    </form>
  );
};

export default EventForm;
<<<<<<< HEAD
=======

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
