import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerForEvent } from '../services/api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: []
  });

  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({
      ...formData,
      interests: updatedInterests
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerForEvent(eventId, formData);
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const interestOptions = ['AI', 'Robotics', 'Sports', 'Music', 'Technology', 'Workshop'];

  return (
    <div className="registration-form">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Interests</label>
          <div className="interests-container">
            {interestOptions.map(interest => (
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;