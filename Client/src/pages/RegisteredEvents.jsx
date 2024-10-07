import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisteredEventsPage = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // Fetch all the events the user has registered for
    const fetchRegisteredEvents = async () => {
      const res = await axios.get('/api/users/registered-debates'); // Assuming this API endpoint returns registered debates
      setRegisteredEvents(res.data);
    };
    fetchRegisteredEvents();
  }, []);

  return (
    <div className="registered-events-page">
      <h2>Your Registered Events</h2>
      {registeredEvents.length > 0 ? (
        <ul>
          {registeredEvents.map(event => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Time:</strong> {event.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not registered for any events yet.</p>
      )}
    </div>
  );
};

export default RegisteredEventsPage;
