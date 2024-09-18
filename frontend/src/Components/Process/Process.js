import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Process.css';

const ComplaintProcess = () => {
    const [searchId, setSearchId] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateRangeFilter, setDateRangeFilter] = useState('All');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:8000/complaints');
            setComplaints(response.data);
            setFilteredComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    // Search by complaint ID
    const handleSearch = () => {
        const trimmedSearchId = searchId.trim().toLowerCase();
        if (trimmedSearchId === '') {
            setFilteredComplaints(complaints); // Show all complaints if search field is empty
            return;
        }

        const result = complaints.filter(complaint =>
            complaint.complaintId.toLowerCase() === trimmedSearchId
        );

        setFilteredComplaints(result.length ? result : []);
    };

    const filterByStatus = (status) => {
        setStatusFilter(status);
        let filtered = complaints;
        if (status !== 'All') {
            filtered = complaints.filter(complaint => complaint.status === status);
        }
        setFilteredComplaints(filtered);
    };

    const filterByDateRange = (range) => {
        setDateRangeFilter(range);
        const currentDate = new Date();
        let filtered = complaints;

        if (range !== 'All') {
            const rangeMap = {
                'Last 7 days': 7,
                'Last 30 days': 30,
                'Last year': 365,
            };
            const days = rangeMap[range];
            const targetDate = new Date();
            targetDate.setDate(currentDate.getDate() - days);

            filtered = complaints.filter(complaint => new Date(complaint.createdAt) >= targetDate);
        }

        setFilteredComplaints(filtered);
    };

    // Function to handle status change and update the backend
    const handleStatusChange = async (complaintId, newStatus) => {
        try {
            await axios.put(`http://localhost:8000/complaints/${complaintId}`, { status: newStatus });
            // Update the local state immediately (to reflect changes without re-fetching)
            const updatedComplaints = complaints.map(complaint =>
                complaint.complaintId === complaintId ? { ...complaint, status: newStatus } : complaint
            );
            setComplaints(updatedComplaints);
            setFilteredComplaints(updatedComplaints); // Also update the filtered list
            console.log(`Status for complaint ${complaintId} updated to ${newStatus}`);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <div className="process-container">
            <h2>Complaint Tracking</h2>

            {/* Search by Complaint ID */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Complaint ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Status Filter */}
            <div className="filter-container">
                <div className="status-filter">
                    <label>Status</label>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                name="status"
                                id="all"
                                checked={statusFilter === 'All'}
                                onChange={() => filterByStatus('All')}
                            />
                            <label htmlFor="all">All</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="status"
                                id="pending"
                                checked={statusFilter === 'Pending'}
                                onChange={() => filterByStatus('Pending')}
                            />
                            <label htmlFor="pending">Pending</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="status"
                                id="inProgress"
                                checked={statusFilter === 'In Progress'}
                                onChange={() => filterByStatus('In Progress')}
                            />
                            <label htmlFor="inProgress">In Progress</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="status"
                                id="resolved"
                                checked={statusFilter === 'Resolved'}
                                onChange={() => filterByStatus('Resolved')}
                            />
                            <label htmlFor="resolved">Resolved</label>
                        </li>
                    </ul>
                </div>

                {/* Date Range Filter */}
                <div className="date-range">
                    <label>Date Range</label>
                    <select value={dateRangeFilter} onChange={(e) => filterByDateRange(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Last 7 days">Last 7 days</option>
                        <option value="Last 30 days">Last 30 days</option>
                        <option value="Last year">Last year</option>
                    </select>
                </div>
            </div>

            {/* Display Filtered Complaints */}
            <div className="complaint-list">
                {filteredComplaints.length ? (
                    filteredComplaints.map(complaint => (
                        <div key={complaints.complaintId} className="complaint-card">
                            <p><strong>Complaint ID:</strong> {complaint.complaintId}</p>
                            <p><strong>Date and Time of Complaint:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                            <p><strong>Name of Complainant:</strong> {complaint.name}</p>
                            <p><strong>Status:</strong></p>
                            <select
                                value={complaint.status}
                                onChange={(e) => handleStatusChange(complaint.complaintId, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Resolved</option>
                            </select>
                            <button>View Details</button>
                        </div>
                    ))
                ) : (
                    <p>No complaints found</p>
                )}
            </div>
            <div className="pagination">
                <span>Previous</span> 1 2 3 <span>Next</span>
            </div>
        </div>
    );
};

export default ComplaintProcess;
