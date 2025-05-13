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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      navigate('/events');
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
    </form>
  );
};

export default EventForm;

