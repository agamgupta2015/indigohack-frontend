import React from 'react';
import './Model.css';

const Modal = ({ flight, onClose }) => {
    if (!flight) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Flight Details</h2>
                <p><strong>Flight ID:</strong> {flight.flight_id}</p>
                <p><strong>Airline:</strong> {flight.airline}</p>
                <p><strong>Status:</strong> {flight.status}</p>
                <p><strong>Departure Gate:</strong> {flight.departure_gate}</p>
                <p><strong>Arrival Gate:</strong> {flight.arrival_gate}</p>
                <p><strong>Scheduled Departure:</strong> {new Date(flight.scheduled_departure).toLocaleString()}</p>
                <p><strong>Scheduled Arrival:</strong> {new Date(flight.scheduled_arrival).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Modal;
