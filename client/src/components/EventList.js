
/*
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

import React from 'react';
import { Link } from 'react-router-dom';
import './EventList.css'; // Import the CSS

const EventList = ({ events,onEdit }) => {
  if (!events) return <div>Loading events...</div>;

  return (
    <div className="event-container">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <Link to={`/events/${event._id}`} className="event-title">
                <h3>{event.name}</h3>
              </Link>

              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Tags:</strong> {event.tags?.join(', ')}</p>

              <button onClick={() => handleEdit(event._id)} className="edit-button">
               Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList; */

import React from 'react';
import { Link } from 'react-router-dom';
import './EventList.css'; // Import the CSS styles

const EventList = ({ events, onEdit, onDelete }) => {
  if (!events) return <div>Loading events...</div>;


  return (
    <div className="event-container">
      <h2>Upcoming Events</h2>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <Link to={`/events/${event._id}`} className="event-title">
                <h3>{event.name}</h3>
              </Link>

              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Tags:</strong> {event.tags?.join(', ')}</p>

              <button
                onClick={() => onEdit(event._id)}
                className="edit-button"
                style={{ marginTop: '10px' }}
              >
                Edit
              </button>

              <button onClick={() => onDelete(event._id)} className="delete-btn" style={{ marginTop: '10px' }}>Delete</button>
                
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;

