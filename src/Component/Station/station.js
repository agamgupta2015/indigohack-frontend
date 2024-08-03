import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StationSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchStations();
    }else{
      setStations([]);
    }
  }, [searchQuery]);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`https://hackuser88-indigohack-backend-m0fi-code-redirect-3.apps.arolab37nonprod.goindigo.in/api/stations?q=${searchQuery}`);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for stations..."
      />
      <ul>
        {stations.map((station) => (
          <li key={station.station_id}>{station.station_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StationSearch;
