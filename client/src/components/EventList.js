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
    <div className="event-list">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <Link to={`/events/${event._id}`}>
                <h3>{event.title}</h3>
              </Link>
              <p>
                <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;