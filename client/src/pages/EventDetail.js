import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, registerForEvent } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
<<<<<<< HEAD
        console.error('Failed to fetch event:', err.message || err);
        setEvent(null);
=======
        console.error('Failed to fetch event:', err);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await registerForEvent(event._id);
      alert('Successfully registered!');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  if (loading)
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading event details...</div>;

  if (!event)
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Event not found</div>;

  const posterUrl = event.poster
    ? `http://localhost:5000/uploads/${event.poster}`
    : '/default-image.jpg';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '2.8rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '2rem',
          }}
        >
          Event Details
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            width: '100%',
            overflow: 'hidden',
            flexWrap: 'wrap',
            padding: '2rem',
          }}
        >
          {/* Poster Section */}
          <div style={{ flex: '1.2', minWidth: '350px' }}>
            <img
              src={posterUrl}
              alt="Event Poster"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          {/* Info Section */}
          <div style={{ flex: '1', padding: '2rem', minWidth: '350px' }}>
            <h2
              style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#2c3e50',
              }}
            >
              {event.name}
            </h2>

            <h3 style={sectionHeadingStyle}>Description</h3>
            <div style={infoBox}>
              <p style={textStyle}>{event.description}</p>
            </div>

            <h3 style={sectionHeadingStyle}>Event Details</h3>
            <div style={infoBox}>
              <p style={textStyle}>
                <strong style={{ color: '#0077cc' }}>Date:</strong>{' '}
                {new Date(event.date).toLocaleString()}
              </p>
              <p style={textStyle}>
                <strong style={{ color: '#0077cc' }}>Venue:</strong> {event.location}
              </p>
              {event.tags?.length > 0 && (
                <p style={textStyle}>
                  <strong style={{ color: '#0077cc' }}>Tags:</strong> {event.tags.join(', ')}
                </p>
              )}
            </div>

            {event.createdBy && typeof event.createdBy === 'object' && (
              <>
                <h3 style={sectionHeadingStyle}>Organizer Info</h3>
                <div style={infoBox}>
                  <p style={textStyle}>
                    <strong style={{ color: '#0077cc' }}>Organized by:</strong> {event.createdBy.name}
                  </p>
                  <p style={textStyle}>
                    <strong style={{ color: '#0077cc' }}>Contact:</strong> {event.createdBy.email}
                  </p>
                </div>
              </>
            )}

            {/* Google Form Registration Link */}
            {event.googleFormLink && (
              <>
                <h3 style={sectionHeadingStyle}>Registration Link</h3>
                <div style={infoBox}>
                  <a
                    href={event.googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0077cc', fontSize: '1.1rem', wordBreak: 'break-word' }}
                  >
                    Register Here
                  </a>
                </div>
              </>
            )}

            <button
              onClick={handleRegister}
              style={{
                marginTop: '1.5rem',
                padding: '0.9rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                width: '100%',
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
=======
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.dateTime).toLocaleString()}</p>
      <p>Venue: {event.venue}</p>
      <button onClick={() => registerForEvent(event._id)}>Register</button>
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    </div>
  );
};

<<<<<<< HEAD
const infoBox = {
  backgroundColor: '#f8f9fa',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  border: '1px solid rgb(16, 24, 32)',
};

const textStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.7',
  color: '#34495e',
};

const sectionHeadingStyle = {
  fontSize: '1.4rem',
  fontWeight: '600',
  margin: '1.5rem 0 0.5rem',
  color: '#6a1b9a',
};

export default EventDetail;
=======
export default EventDetail;
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
