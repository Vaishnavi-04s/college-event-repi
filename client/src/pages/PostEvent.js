import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

<form onSubmit={handleSubmit} className="space-y-4">
  <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
  <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
  <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
  <input name="tag" value={form.tag} onChange={handleChange} placeholder="Interest Tag (e.g. AI, Web Dev)" className="w-full p-2 border rounded" required />
  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
</form>


const PostEvent = () => {
  const [form, setForm] = useState({ title: '', description: '', date: '', image: '', tag: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/events', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin');
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <input name="tag" value={form.tag} onChange={handleChange} placeholder="Interest Tag (e.g. AI, Web Dev)" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default PostEvent;