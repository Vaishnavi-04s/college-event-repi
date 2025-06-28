import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import EventList from '../components/EventList';  // your styled event cards
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const history = useHistory();

  // Extract user info from token (assuming JWT) to get userId
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      return payload.userId || payload.id || null; // Based on how backend stores it
    } catch (e) {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  const fetchAllEvents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view events.');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
      setMessage('');
    } catch (err) {
      console.error('Failed to fetch events:', err?.response?.data || err.message);
      setMessage('Failed to fetch events');
    }
  };

  const fetchOrganizerEvents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view your events.');
      return;
    }
    if (!userId) {
      setMessage('Invalid user session.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fix: use createdBy._id to compare
     
        const organizerEvents = res.data.filter(event => event.createdBy?._id === userId);

      

      setEvents(organizerEvents);
      setMessage('');
    } catch (err) {
      console.error('Failed to fetch your events:', err?.response?.data || err.message);
      setMessage('Failed to fetch your events');
    }
  };

  useEffect(() => {
    fetchAllEvents();
    setIsEditingMode(false);
  }, []);

  const handleSidebarClick = (option) => {
    if (option === 'upcoming') {
      setIsEditingMode(false);
      fetchAllEvents();
    } else if (option === 'edit') {
      setIsEditingMode(true);
      fetchOrganizerEvents();
    } else if (option === 'create') {
      history.push('/create-event');
    } else if (option === 'notifications') {
      alert('Notifications coming soon!');
    } else if (option === 'profile') {
      alert('Profile coming soon!');
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <h2>Organizer's Dashboard</h2>
        <ul>
          <li onClick={() => handleSidebarClick('upcoming')}>Upcoming Events</li>
          <li onClick={() => handleSidebarClick('edit')}>Edit Events</li>
          <li onClick={() => handleSidebarClick('create')}>Create Event</li>
          <li onClick={() => handleSidebarClick('notifications')}>Notifications</li>
          <li onClick={() => handleSidebarClick('profile')}>Profile</li>
        </ul>
      </nav>

      <main className="main-content">
        {message && (
          <p className={message.includes('Failed') ? 'message-error' : 'message-success'}>
            {message}
          </p>
        )}

        {!isEditingMode ? (
          <>
            <h1></h1>
            <EventList events={events} showActions={false} />
          </>
        ) : (
          <>
            <h1></h1>
            <EventList
              events={events}
              showActions={true}
              onEdit={(id) => history.push(`/edit-events/${id}`)}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
