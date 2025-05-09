import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api'; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;

  return (
    <div style={styles.container}>
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul style={styles.list}>
          {events.map((event) => (
            <li key={event._id} style={styles.item}>
              <Link to={`/events/${event._id}`} style={styles.title}>
                <h3>{event.name}</h3>
              </Link>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Tags:</strong> {event.tags?.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textDecoration: 'none',
    color: '#333',
  },
};

export default EventList;
