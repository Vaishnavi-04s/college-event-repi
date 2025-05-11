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
    interests: []
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'interests') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData({ ...formData, interests: selectedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
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
      </div>
    </div>
  );
};

export default Register;
