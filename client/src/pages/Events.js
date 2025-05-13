import React from 'react';
import EventList from '../components/EventList';

const Events = () => {
  return (
    <div className="events-page">
      <h1>All Events</h1>
      <EventList></EventList>
    </div>
  );
};

export default Events;