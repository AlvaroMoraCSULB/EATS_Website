import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Predefined list of events mapped by date
const initialEvents = {
  '2025-04-10': [{ title: "Industry Speaker Event", time: "5:00 PM", location: "VEC 524" }],
  '2025-04-15': [{ title: "PCB Workshop", time: "2:00 PM", location: "ECS 302" }],
  '2025-04-16': [{ title: "Officer Group Meeting", time: "3:15 PM", location: "ECS 302" }],
  '2025-04-26': [
    { title: "Club Picnic", time: "12:00 PM", location: "Campus Park" },
    { title: "Officer Strategy Meeting", time: "4:00 PM", location: "ECS 302" }
  ],
};

export default function CalendarPage() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventText, setNewEventText] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  // Format a date object to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Check if a date has events
  const hasEvents = (date) => {
    return events[formatDate(date)] && events[formatDate(date)].length > 0;
  };

  // Get events for selected day
  const dateKey = formatDate(selectedDate);
  const dateEvents = events[dateKey] || [];

  // Filter and sort events happening within 7 days of the selected date
  const upcomingEvents = Object.entries(events)
    .filter(([date]) => {
      const eventDate = new Date(date);
      const start = new Date(selectedDate);
      const end = new Date(selectedDate);
      end.setDate(start.getDate() + 7);
      return eventDate >= start && eventDate <= end;
    })
    .sort(([a], [b]) => new Date(a) - new Date(b));

  // Add a new event to selected date
  const handleAddEvent = () => {
    if (!newEventText || !newEventTime || !newEventLocation) return;
    const newEvent = { title: newEventText, time: newEventTime, location: newEventLocation };
    setEvents(prev => ({
      ...prev,
      [formatDate(selectedDate)]: [...(prev[formatDate(selectedDate)] || []), newEvent]
    }));
    setNewEventText("");
    setNewEventTime("");
    setNewEventLocation("");
    setShowAddEvent(false);
  };

  // Set color based on event type
  const getEventColor = (eventTitle) => {
    if (eventTitle.toLowerCase().includes("officer")) return "green";
    if (eventTitle.toLowerCase().includes("workshop")) return "blue";
    if (eventTitle.toLowerCase().includes("speaker")) return "purple";
    return "black";
  };

  // Custom tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month' && hasEvents(date)) {
      return <div style={{ height: '4px', width: '4px', background: '#FFD700', borderRadius: '50%', margin: '2px auto' }}></div>;
    }
    return null;
  };

  // Custom tile class for calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && hasEvents(date)) {
      return 'has-events';
    }
    return null;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ecaa00", padding: "20px" }}>
      {/* Left Section: Calendar and Event Creation */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px"
        }}>
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            style={{
              width: "100%",
              border: "none",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
            className="enhanced-calendar"
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        </div>

        {/* Add Event Button */}
        <button
          style={{ marginTop: "20px", padding: "10px 20px", background: "green", color: "white", border: "none", cursor: "pointer" }}
          onClick={() => setShowAddEvent(true)}
        >
          + Add Event
        </button>

        {/* Event Form */}
        {showAddEvent && (
          <div style={{ marginTop: "10px", background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.2)" }}>
            <input type="text" value={newEventText} onChange={(e) => setNewEventText(e.target.value)} placeholder="Event Title" />
            <input type="text" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} placeholder="Time (e.g. 3:15 PM)" />
            <input type="text" value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} placeholder="Location" />
            <br />
            <button onClick={handleAddEvent}>Add</button>
            <button onClick={() => setShowAddEvent(false)}>Cancel</button>
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h4>Legend:</h4>
          <div><span style={{ background: "green", ...legendDotStyle }}></span> Officer Event</div>
          <div><span style={{ background: "blue", ...legendDotStyle }}></span> Workshop Event</div>
          <div><span style={{ background: "purple", ...legendDotStyle }}></span> Speaker Event</div>
          <div><span style={{ background: "#FFD700", ...legendDotStyle }}></span> Day with Event</div>
        </div>

        {/* Calendar CSS */}
        <style>{`
          .enhanced-calendar {
            color: #333;
            font-size: 16px;
            width: 100%;
          }
          
          .enhanced-calendar .react-calendar__navigation button {
            color: #333;
            font-weight: bold;
            font-size: 1em;
            min-width: 44px;
          }
          
          .enhanced-calendar .react-calendar__tile {
            padding: 0.75em 0.5em;
            color: #333;
            font-weight: 500;
            position: relative;
          }
          
          .enhanced-calendar .react-calendar__tile--now {
            background: #ffe0b2;
            font-weight: bold;
          }
          
          .enhanced-calendar .react-calendar__tile--active {
            background: #1976d2;
            color: white;
          }
          
          .enhanced-calendar .react-calendar__month-view__weekdays {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.85em;
            color: #555;
          }
          
          .enhanced-calendar .react-calendar__month-view__days__day--weekend {
            color: #d32f2f;
          }
          
          .enhanced-calendar .has-events {
            background: rgba(255, 215, 0, 0.2);
          }
          
          .enhanced-calendar .has-events:hover {
            background: rgba(255, 215, 0, 0.3);
          }
          
          .enhanced-calendar .has-events.react-calendar__tile--now {
            background: linear-gradient(to bottom right, #ffe0b2, rgba(255, 215, 0, 0.3));
          }
          
          .enhanced-calendar .has-events.react-calendar__tile--active {
            background: #1976d2;
          }
        `}</style>
      </div>

      {/* Middle Section: Selected Day's Events */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "#FFE57F", padding: "20px", borderRadius: "15px", border: "2px solid black" }}>
          <h3>{selectedDate.toDateString()}</h3>
          {dateEvents.length === 0 ? <p>No events for this date.</p> :
            dateEvents.map((event, index) => (
              <div key={index} onClick={() => setSelectedEvent(event)}>
                <p style={{ color: getEventColor(event.title), fontWeight: "bold" }}>{event.title}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Right Section: Upcoming Events */}
      <div style={{ flex: "0.7", background: "#fff9c4", padding: "20px", borderRadius: "15px", marginLeft: "20px" }}>
        <h3>Upcoming Events (Next 7 Days)</h3>
        <ul>
          {upcomingEvents.length === 0 ? <li>No upcoming events.</li> :
            upcomingEvents.map(([date, eventsList], index) => (
              <li key={index}><strong>{date}:</strong> {eventsList.map(e => e.title).join(", ")}</li>
            ))}
        </ul>
      </div>

      {/* Pop-up with event details */}
      {selectedEvent && (
        <div style={popupStyle}>
          <h3>{selectedEvent.title}</h3>
          <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

// Shared style for legend icons
const legendDotStyle = {
  display: "inline-block",
  width: "15px",
  height: "15px",
  marginRight: "10px",
  borderRadius: "50%"
};

// Popup styling
const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  border: "2px solid black",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  zIndex: 9999,
  textAlign: "center"
};