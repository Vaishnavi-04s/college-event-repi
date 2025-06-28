<<<<<<< HEAD
=======

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
import React from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';

<<<<<<< HEAD
const EventList = ({ events, onDelete, onEdit }) => {
  if (!events || events.length === 0) {
    return <p className="no-events">No events to show.</p>;
  }

  return (
    <div className="event-list-container">
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>
        Upcoming Events
      </h2>

      <div className="event-grid">
        {events.map((event) => {
          const posterUrl = event.poster
            ? `http://localhost:5000/uploads/${event.poster}`
            : '/default-image.jpg';

          return (
            <div key={event._id} className="event-card">
              <Link to={`/events/${event._id}`} className="event-link">
                <img
                  src={posterUrl}
                  alt={event.name || 'Event Poster'}
                  className="event-poster"
                  onError={(e) => {
                    e.target.src = '/default-image.jpg';
                  }}
                />
                <h3 className="event-title">{event.name || 'Untitled Event'}</h3>
              </Link>

              <div className="event-info">
                <p>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location || 'TBD'}
                </p>
                {event.createdBy && (
                  <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                    <strong>Organized by:</strong> {event.createdBy.name} ({event.createdBy.email})
                  </p>
                )}
                {onEdit && (
                  <button className="edit-btn" onClick={() => onEdit(event._id)}>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button className="delete-btn" onClick={() => onDelete(event._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  // inside EventList.jsx or similar
return (
  <div className="event-list">
    {events.map(event => (
      <div key={event._id} className="event-card">
        <h4>{event.name}</h4>
        <p>{event.date?.slice(0,10)} at {event.location}</p>
        {showActions && (
          <button onClick={() => onEdit(event._id)}>Edit</button>
        )}
      </div>
    ))}
  </div>
);

};

export default EventList;
=======
const EventList = ({ events, onEdit, onDelete,onNotify, showActions = false }) => {
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

              {/* ✅ Only show buttons if showActions is true */}
              {showActions && (
                <>
                  <button
                    onClick={() => onEdit(event._id)}
                    className="edit-button"
                    style={{ marginTop: '10px' }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(event._id)}
                    className="delete-btn"
                    style={{ marginTop: '10px' }}
                  >
                    Delete
                  </button>
                  {/* ✅ Send Notifications Button */}
                   <button
                      onClick={() => onNotify(event._id)}
                      className="notify-button"
                      style={{ marginTop: '10px', backgroundColor: '#4caf50', color: 'white' }}
                    >
                     Send Notifications
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;


>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
