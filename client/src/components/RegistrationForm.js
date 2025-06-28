import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
=======
import { useParams, useNavigate } from 'react-router-dom';
import { registerForEvent } from '../services/api';
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
<<<<<<< HEAD
    password: '',
    interests: [],
    role: 'user', // Default role
  });

=======
    interests: []
  });

  const { eventId } = useParams();
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
<<<<<<< HEAD
      [e.target.name]: e.target.value,
=======
      [e.target.name]: e.target.value
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    });
  };

  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
<<<<<<< HEAD
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];

    setFormData({
      ...formData,
      interests: updatedInterests,
=======
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({
      ...formData,
      interests: updatedInterests
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await registerUser(formData);
      console.log('Registration success:', response);
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Registration failed');
=======
      await registerForEvent(eventId, formData);
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error(err);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    }
  };

  const interestOptions = ['AI', 'Robotics', 'Sports', 'Music', 'Technology', 'Workshop'];

  return (
    <div className="registration-form">
<<<<<<< HEAD
      <h2>Register</h2>
=======
      <h2>Register for Event</h2>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
<<<<<<< HEAD
            autoComplete="name"
          />
        </div>

=======
          />
        </div>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
<<<<<<< HEAD
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label>Interests</label>
          <div className="interests-container">
            {interestOptions.map((interest) => (
=======
          />
        </div>
        <div className="form-group">
          <label>Interests</label>
          <div className="interests-container">
            {interestOptions.map(interest => (
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
              <div key={interest} className="interest-option">
                <input
                  type="checkbox"
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                <label htmlFor={interest}>{interest}</label>
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>

=======
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default RegistrationForm;
=======
export default RegistrationForm;
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
