import React, { useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
=======
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || 'Login failed');
        return;
      }

      // Save token and user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'organizer') {
=======
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        history.push('/admin-dashboard');
      } else {
        history.push('/user-dashboard');
      }
    } catch (err) {
<<<<<<< HEAD
      console.error('Login error:', err);
      setError('Failed to login. Try again later.');
=======
      setError(err.response?.data?.msg || 'Login failed');
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    }
  };

  return (
    <div className="login-page">
<<<<<<< HEAD
      <div className="login-left">
        {/* Optional image or styling */}
      </div>

      <div className="login-right">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">Login</button>

          {error && <div className="login-error">{error}</div>}
=======
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">Login</button>
          {error && <p className="login-error">{error}</p>}
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        </form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

export default Login;
