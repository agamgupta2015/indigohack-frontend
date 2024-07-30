import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Notify/Model';
import './App.css';

const FLIGHTS_PER_PAGE = 4;

function FlightStatus() {
    const [flights, setFlights] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortField, setSortField] = useState(''); 
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        fetchFlights();
        const interval = setInterval(fetchFlights, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchFlights = async () => {
        const response = await axios.get('http://localhost:8000/flight/all');
        setFlights(response.data);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (field) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1);
    };

    const sortedFlights = [...flights].sort((a, b) => {
        if (sortField) {
            const fieldA = a[sortField].toLowerCase();
            const fieldB = b[sortField].toLowerCase();
            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        }
        return 0;
    });

    const filteredFlights = sortedFlights.filter(flight => {
        const matchesSearchQuery =
            flight.flight_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            flight.airline.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatusFilter =
            statusFilter === 'all' || flight.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearchQuery && matchesStatusFilter;
    });

    const indexOfLastFlight = currentPage * FLIGHTS_PER_PAGE;
    const indexOfFirstFlight = indexOfLastFlight - FLIGHTS_PER_PAGE;
    const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredFlights.length / FLIGHTS_PER_PAGE); i++) {
        pageNumbers.push(i);
    }

    const handleFlightClick = (flight) => {
        setSelectedFlight(flight);
    };

    const handleCloseModal = () => {
        setSelectedFlight(null);
    };

    return (
        <div className="container">
            <h1>Flight Status</h1>
            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Flight ID or Airline"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="status-container">
                    <select value={statusFilter} onChange={handleStatusChange}>
                        <option value="all">All</option>
                        <option value="on time">On-time</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="flight-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSortChange('flight_id')}>Flight ID</th>
                            <th onClick={() => handleSortChange('airline')}>Airline</th>
                            <th onClick={() => handleSortChange('status')}>Status</th>
                            <th onClick={() => handleSortChange('departure_gate')}>Departure Gate</th>
                            <th onClick={() => handleSortChange('arrival_gate')}>Arrival Gate</th>
                            <th onClick={() => handleSortChange('scheduled_departure')}>Scheduled Departure</th>
                            <th onClick={() => handleSortChange('scheduled_arrival')}>Scheduled Arrival</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFlights.map(flight => (
                            <tr key={flight.flight_id} className={flight.status.toLowerCase()} onClick={() => handleFlightClick(flight)}>
                                <td>{flight.flight_id}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.status}</td>
                                <td>{flight.departure_gate}</td>
                                <td>{flight.arrival_gate}</td>
                                <td>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                                <td>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            {selectedFlight && <Modal flight={selectedFlight} onClose={handleCloseModal} />}
        </div>
    );
}

export default FlightStatus;
