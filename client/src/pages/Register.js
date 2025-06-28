import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
<<<<<<< HEAD
    interests: [],
=======
    interests: []
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
  });

  const [error, setError] = useState('');

<<<<<<< HEAD
  const interestsOptions = [
    'Coding',
    'AI',
    'Web Development',
    'IoT',
    'Robotics',
    'Cybersecurity',
    'Cultural',
    'Sports',
    'Business',
    'Literature',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'interests') {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          interests: [...prev.interests, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.filter((interest) => interest !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
=======
  const handleChange = (e) => {
    if (e.target.name === 'interests') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData({ ...formData, interests: selectedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    console.log('Form data:', formData); // DEBUG: log data before sending

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration successful! Please log in.');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      history.push('/login');
=======
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration successful! Please log in.');
      history.push('/login');
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        history.push('/admin-dashboard');
      } else {
        history.push('/events');
      }
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
<<<<<<< HEAD
      <div className="register-card">
        <div className="register-image-section" />
        <div className="register-form-section">
          <h2 className="register-title">Register</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <label className="register-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="register-input"
            />

            <label className="register-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="register-input"
            />

            <label className="register-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="register-input"
            />

            <label className="register-label">Register as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="register-input"
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>  {/* Changed admin to organizer */}
            </select>

            {formData.role === 'user' && (
              <>
                <label className="register-label">Areas of Interest</label>
                <div className="interests-grid">
                  {interestsOptions.map((interest) => (
                    <label key={interest} className="interest-item">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest.toLowerCase()}
                        checked={formData.interests.includes(interest.toLowerCase())}
                        onChange={handleChange}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </>
            )}

            <button type="submit" className="register-button">Register</button>
            {error && <p className="register-error">{error}</p>}
          </form>
        </div>
=======
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <label className="register-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />

          <label className="register-label">Register as</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="register-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin (Head)</option>
          </select>

          {formData.role === 'user' && (
            <>
              <label className="register-label">Areas of Interest</label>
              <select
                name="interests"
                multiple
                value={formData.interests}
                onChange={handleChange}
                required
                className="register-input"
                style={{ height: '100px' }}
              >
                <option value="coding">Coding</option>
                <option value="ai">AI</option>
                <option value="web">Web Development</option>
                <option value="iot">IoT</option>
                <option value="robotics">Robotics</option>
                <option value="cyber">Cybersecurity</option>
              </select>
            </>
          )}

          <button type="submit" className="register-button">Register</button>
          {error && <p className="register-error">{error}</p>}
        </form>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      </div>
    </div>
  );
};

export default Register;
