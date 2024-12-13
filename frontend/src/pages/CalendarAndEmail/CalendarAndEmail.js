import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarAndEmail = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ todo: '', date: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched events:', data);
        setEvents(data);
      });
  }, []);

  // Add a new event
  const handleAddEvent = () => {
    if (!newEvent.todo || !newEvent.date) {
      alert('Please fill out both the event name and date.');
      return;
    }
    fetch('http://localhost:5000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Added event:', data);
        setEvents((prevEvents) => [...prevEvents, data]);
        // Clear the form
        setNewEvent({ todo: '', date: '' });
      });
  };

  // Edit an event
  const handleEditEvent = () => {
    if (!editEvent) return;

    fetch(`http://localhost:5000/events/${editEvent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editEvent),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        console.log('Edited event:', updatedEvent);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        // Clear the form and modal
        setSelectedEvent(null);
        setEditEvent(null);
      });
  };

  // Delete an event
  const handleDeleteEvent = (id) => {
    fetch(`http://localhost:5000/events/${id}`, { method: 'DELETE' })
      .then(() => {
        console.log('Deleted event with ID:', id);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        // Close the modal
        setSelectedEvent(null);
      });
  };

  return (
    <div>
      <h1>Event Calendar</h1>

      {/* Add Event Form */}
      <div style={{ border: '1px solid black', padding: '20px', marginBottom: '20px' }}>
        <h3>Add Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.todo}
          onChange={(e) => setNewEvent({ ...newEvent, todo: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      {/* Edit/Delete Event Modal */}
      {selectedEvent && (
        <div style={{ border: '1px solid black', padding: '20px', marginBottom: '20px' }}>
          <h3>Edit/Delete Event</h3>
          <p>
            <strong>Current Event:</strong> {selectedEvent.todo} on {selectedEvent.date}
          </p>

          {/* Edit Form */}
          <div>
            <input
              type="text"s
              value={editEvent?.todo || ''}
              onChange={(e) => setEditEvent({ ...editEvent, todo: e.target.value })}
              placeholder="Event Name"
            />
            <input
              type="datetime-local"
              value={editEvent?.date || ''}
              onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
            />
            <button onClick={handleEditEvent}>Save Changes</button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteEvent(selectedEvent.id)}
            style={{ color: 'red' }}
          >
            Delete Event
          </button>

          {/* Close Button */}
          <button onClick={() => setSelectedEvent(null)}>Cancel</button>
        </div>
      )}

      {/* Calendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          id: event.id,
          title: event.todo,
          start: event.date,
        }))}
        eventClick={(info) => {
          console.log('Event clicked:', info.event);
          const clickedEvent = {
            id: info.event.id,
            todo: info.event.title,
            date: info.event.start.toISOString(),
          };
          console.log('Mapped event:', clickedEvent);
          setSelectedEvent(clickedEvent);
          setEditEvent(clickedEvent);
        }}
      />
    </div>
  );
};

export default CalendarAndEmail;
