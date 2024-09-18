import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComplaintDetails.css';


import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const url = 'http://localhost:8000/complaints';
            const res = await axios.get(url);
            setComplaints(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch complaints');
            setLoading(false);
        }
    };

    const handleStaffChange = async (id, staff) => {
        try {
            const url = `http://localhost:8000/complaints/${id}`;
            await axios.put(url, { assignedStaff: staff });
            fetchComplaints(); // Refresh the complaints list
        } catch (err) {
            console.error('Failed to update staff assignment:', err);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const url = `http://localhost:8000/complaints/${id}`;
            await axios.put(url, { status });
            fetchComplaints(); // Refresh the complaints list
        } catch (err) {
            console.error('Failed to update complaint status:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:8000/complaints/${id}`;
            await axios.delete(url);
            fetchComplaints(); // Refresh the complaints list
        } catch (err) {
            console.error('Failed to delete complaint:', err);
        }
    };

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Edit complaint ID: ${id}`);
    };

    if (loading) return <div>Loading complaints...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Received Complaints</h1>
            <table>
                <thead>
                    <tr>
                        <th>Complaint ID</th>
                        <th> Mail Id</th>
                        <th>Complaint Type</th>
                        <th>Complaint Description</th>
                        <th>Assigned Staff</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.length > 0 ? (
                        complaints.map((complaint) => (
                            <tr key={complaint._id}>
                                <td>{complaint.complaintId}</td>
                                <td><td>{complaint.email}</td></td>
                                <td>{complaint.category}</td>
                                <td>{complaint.description}</td>
                                <td>
                                    <select 
                                        value={complaint.assignedStaff || ''} 
                                        onChange={(e) => handleStaffChange(complaint._id, e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Treasurer">Treasurer</option>
                                        <option value="Boat Register">Boat Register</option>
                                        <option value="Employee manager">Employee manager</option>
                                        <option value="sales staff">Sales staff</option>
                                        <option value="Events staff">Events staff</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={complaint.status || ''} 
                                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button onClick={() => handleEdit(complaint._id)} className="icon-btn">
                                            <i className="fas fa-edit"></i> {/* Font Awesome edit icon */}
                                        </button>
                                        <button onClick={() => handleDelete(complaint._id)} className="icon-btn">
                                            <i className="fas fa-trash"></i> {/* Font Awesome delete icon */}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No complaints available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Complaints;
