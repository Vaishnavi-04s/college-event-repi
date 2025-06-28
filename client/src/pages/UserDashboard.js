import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import EventList from '../components/EventList';
=======
import EventList from '../components/EventList'; // Adjust path if needed
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
import './UserDashboard.css';

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
<<<<<<< HEAD
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('upcoming');
=======
  const [message, setMessage] = useState('');
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view events.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/events', {
<<<<<<< HEAD
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
      setMessage('');
=======
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setMessage('Failed to fetch events.');
    }
  };

<<<<<<< HEAD
  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/registered', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegisteredEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch registered events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'upcoming':
        return <EventList events={events} />;
      case 'registered':
        return <EventList events={registeredEvents} />;
      case 'profile':
        return (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <p>Details coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li
            className={activeSection === 'upcoming' ? 'active' : ''}
            onClick={() => setActiveSection('upcoming')}
          >
            Upcoming Events
          </li>
          <li
            className={activeSection === 'registered' ? 'active' : ''}
            onClick={() => setActiveSection('registered')}
          >
            Registered Events
          </li>
          <li
            className={activeSection === 'profile' ? 'active' : ''}
            onClick={() => setActiveSection('profile')}
          >
            Profile
          </li>
        </ul>
      </aside>

      <main className="user-dashboard">
        <h2>User Dashboard</h2>
        {message && <p className="message">{message}</p>}
        {renderSection()}
      </main>
=======
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {message && <p className="message">{message}</p>}
      <EventList events={events} showActions={false} />
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    </div>
  );
};

export default UserDashboard;
