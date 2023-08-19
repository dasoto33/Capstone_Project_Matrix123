import React, { useState, useEffect } from 'react';


interface Event {
  id : number
  title : string
  url : string
  datetime_local : string
}

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchEvents()
  }

  const fetchEvents = async () => {}

  useEffect(() => {
    // Fetch data from SeatGeek API
    const fetchEvents = async () => {
      try {
        const apiKey = "MzU3ODMzMTR8MTY5MjM0OTg2Ni42NTE0NTA5"; // Replace with your actual API key
        const encodedSearchQuery = encodeURIComponent(searchQuery); // Encode the search query
        const endpointUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${encodedSearchQuery}`;
        // const endpointUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}`;

        const response = await fetch(endpointUrl);
        const data = await response.json();
        
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (searchQuery){
      fetchEvents()
    }
  }, [searchQuery]);

  const formatDate = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(dateTime).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div>
    <h2 className='search-header'>Search Events</h2>
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a search term"
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
    <div>
      {events.map((event: Event) => (
        <div className="event-item" key={event.id}>
          <h3 className="event-title">{event.title}</h3>
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-url">
            {event.url}
          </a>
          <p className="event-date">{formatDate(event.datetime_local)}</p>
        </div>
      ))}
    </div>
  </div>
  );
};