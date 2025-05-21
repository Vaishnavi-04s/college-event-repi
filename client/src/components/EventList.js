
import React from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';

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


