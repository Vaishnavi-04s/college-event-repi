<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import EventList from '../components/EventList';  // your styled event cards
=======

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
<<<<<<< HEAD
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
=======
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    tags: [],
  });
  const [message, setMessage] = useState('');
  const { id } = useParams(); // Get event id if available
  const history = useHistory();

  // Fetch events
  const fetchEvents = async () => {
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view events.');
      return;
    }
<<<<<<< HEAD
    try {
      const res = await axios.get(`http://localhost:5000/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
      setMessage('');
    } catch (err) {
      console.error('Failed to fetch events:', err?.response?.data || err.message);
=======

    try {
      const res = await axios.get(`http://localhost:5000/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      setMessage('Failed to fetch events');
    }
  };

<<<<<<< HEAD
  const fetchOrganizerEvents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view your events.');
      return;
    }
    if (!userId) {
      setMessage('Invalid user session.');
=======
  useEffect(() => {
  if (id) {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => {
        const event= res.data;
         const formattedDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
         setEventData({
           ...event,
           date: formattedDate,
         });
        })
      .catch(err => {
        console.error('Error fetching event data for editing:', err);
        setMessage('Failed to fetch event for editing');
      });
  } else {
    fetchEvents(); // For new event creation
  }
}, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'tags') {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setEventData({ ...eventData, tags: selected });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to create an event.');
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      return;
    }

    try {
<<<<<<< HEAD
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
=======
      if (id) {
        // If in edit mode, update the event
        await axios.put(`http://localhost:5000/api/events/${id}`, eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('Event updated successfully!');
      } else {
        // Create a new event
        await axios.post('http://localhost:5000/api/events', eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('Event created successfully!');
      }
      setEventData({ name: '', date: '', description: '', location: '', tags: [] });
      fetchEvents();
      history.push('/admin-dashboard');
    } catch (err) {
      console.error('Axios Error:', err);
      setMessage('An error occurred while saving the event');
    }
  };

  const handleDelete = async (eventId) => {
     console.log('Deleting event with ID:', eventId);
  const token = localStorage.getItem('token');
  if (!token) {
    setMessage('You must be logged in to delete an event.');
    return;
  }

  if (!window.confirm('Are you sure you want to delete this event?')) return;

  try {
    await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage('Event deleted successfully!');
    fetchEvents();
  } catch (err) {
    console.error('Error deleting event:', err);
    setMessage('Failed to delete event');
  }
};
const handleNotify = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    setMessage('You must be logged in to send notifications.');
    return;
  }

  try {
    await axios.post(
      `http://localhost:5000/api/events/${eventId}/notify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage('Notifications sent successfully!');
  } catch (err) {
    console.error('Failed to send notifications:', err);
    setMessage('Failed to send notifications.');
  }
};


  return (
    <div className="container">
      <h2>{id ? 'Edit Event' : 'Create New Event'}</h2> {/* Conditional Heading */}
      <EventForm
        eventData={eventData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={!!id}
      />
      {message && (
        <p style={{ marginTop: '10px', color: message.includes('Failed') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      <h3 style={{ marginTop: '40px' }}>All Events</h3>
      <EventList 
       events={events}
       onEdit={(eventId) => history.push(`/admin-dashboard/edit/${eventId}`)}
       onDelete={handleDelete}
      showActions={true}
      onNotify={handleNotify}
      />

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    </div>
  );
};

export default AdminDashboard;
<<<<<<< HEAD
=======


>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
