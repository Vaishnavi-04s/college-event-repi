import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
      history.push('/login'); //
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
  
      if (user.role === 'admin') {
        history.push('/admin-dashboard'); // ✅ redirect to admin dashboard
      } else {
        history.push('/events'); // for normal users
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Register as</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="user">User</option>
          <option value="admin">Admin (Head)</option>
        </select>

        {formData.role === 'user' && (
          <>
            <label style={styles.label}>Areas of Interest</label>
            <select
              name="interests"
              multiple
              value={formData.interests}
              onChange={handleChange}
              required
              style={{ ...styles.input, height: '100px' }}
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

        <button type="submit" style={styles.button}>Register</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ccc',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginTop: '10px',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  }
};

export default Register;
