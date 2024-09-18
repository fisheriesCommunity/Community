import React, { useState } from 'react';
import './TripR.css'; // assuming you have a CSS file for styling

function TripR() {
    const [boatNumber, setBoatNumber] = useState('');
    const [numEmployees, setNumEmployees] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log({
            boatNumber,
            numEmployees,
            ownerName,
            departureTime,
            arrivalTime
        });
    };

    return (
        <div className="tripr-container">
            <h1>Boat Trip Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter Boat Number:</label>
                    <input
                        type="text"
                        value={boatNumber}
                        onChange={(e) => setBoatNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Number of Employees:</label>
                    <input
                        type="number"
                        value={numEmployees}
                        onChange={(e) => setNumEmployees(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Owner Name:</label>
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </div>
                <div className="form-group time-group">
                    <label>Departure Time:</label>
                    <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                    />
                </div>
                <div className="form-group time-group">
                    <label>Arrival Time:</label>
                    <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TripR;
