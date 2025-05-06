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
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    };
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
    </div>
  );
};

export default EventDetail;