// EventForm.jsx (reusable)
import { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ initialData = {}, isEditing = false, eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    tags: [],
    googleFormLink: '',
    poster: null,
  });

  // Update form data when initialData loads (especially for edit)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        date: initialData.date ? initialData.date.slice(0, 10) : '',
        location: initialData.location || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags : [],
        googleFormLink: initialData.googleFormLink || '',
        poster: null, // don't prefill file input
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, poster: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();

      for (const key in formData) {
        if (key === 'tags') {
          formData.tags.forEach(tag => data.append('tags[]', tag));
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      }

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
        alert("✅ Event created successfully!");
      }
    } catch (err) {
      console.error('❌ Error saving event:', err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Event Name"
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
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        name="googleFormLink"
        value={formData.googleFormLink}
        onChange={handleChange}
        placeholder="Google Form Link"
      />
      <input
        type="file"
        name="poster"
        onChange={handleFileChange}
        accept="image/*"
      />
      <input
        name="tags"
        value={formData.tags.join(', ')}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            tags: e.target.value.split(',').map((tag) => tag.trim()),
          }))
        }
        placeholder="Tags (comma separated)"
      />
      <button type="submit">{isEditing ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
