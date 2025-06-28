import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventParticipants = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem('token');
        const eventRes = await axios.get(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(eventRes.data.event);
        setParticipants(eventRes.data.participants);
      } catch (err) {
        console.error('Error loading event details:', err);
      }
    };
    fetchEventData();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{event?.title} - Participants</h2>
      <ul className="space-y-2">
        {participants.map((p, idx) => (
          <li key={idx} className="p-2 border rounded">
            {p.name} - {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

<<<<<<< HEAD
export default EventParticipants;
=======
export default EventParticipants;
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
