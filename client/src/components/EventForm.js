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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
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
    </form>
  );
};

export default EventForm;
