// Events.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="events-page">
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>All Events</h1>
      <EventList events={events} />
    </main>
  );
};

export default Events;
