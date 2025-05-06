import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import at top (correct)
import { createEvent } from '../services/api';

// Correct: useHistory is called INSIDE the component function
const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    venue: '',
    location: '',
    category: 'Technology'
  });
  const history = useHistory(); // <-- This is the correct placement

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      history.push('/events'); // Navigate after successful submission
    } catch (err) {
      console.error('Event creation failed:', err);
    }
  };

  return (
    <div className="create-event">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields here */}
      </form>
    </div>
  );
};

export default CreateEvent;