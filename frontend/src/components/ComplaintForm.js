import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './ComplaintForm.css';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mailId: '',
        phoneNumber: '',
        complaintType: '',
        complaintDescription: '',
        file: null, // To store uploaded file
    });

    const [status, setStatus] = useState(''); // To display status messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('mailId', formData.mailId);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('complaintType', formData.complaintType);
        formDataToSend.append('complaintDescription', formData.complaintDescription);
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Add file to the form data
        }

        try {
            const response = await axios.post('http://localhost:8000/complaints', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file upload
                },
            });

            console.log('Response:', response.data);
            setStatus('Complaint submitted successfully!');
            setFormData({
                name: '',
                mailId: '',
                phoneNumber: '',
                complaintType: '',
                complaintDescription: '',
                file: null, // Reset file input
            });
        } catch (error) {
            console.error('Error submitting complaint:', error);
            setStatus('Error submitting complaint. Please try again.');
        }
    };

    return (
        <form className="complaint-form" onSubmit={handleSubmit}>
            <h1>Submit Your Complaint!</h1>
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    name="mailId"
                    value={formData.mailId} 
                    onChange={handleChange} 
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    placeholder="Enter your phone number"
                    required
                />
            </div>
            <div className="form-group">
                <label>Complaint Type</label>
                <select 
                    name="complaintType" 
                    value={formData.complaintType} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select complaint type</option>
                    <option value="Finance">Finance</option>
                    <option value="Products">Products</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="form-group">
                <label>Complaint Description</label>
                <textarea 
                    name="complaintDescription" 
                    value={formData.complaintDescription} 
                    onChange={handleChange} 
                    placeholder="Enter a detailed description of your complaint"
                    required
                />
                <label>Attach a File</label>
                <input 
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf" // Accept images and PDFs
                />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
            </div>
            {status && <p>{status}</p>}
        </form>
    );
};

export default ComplaintForm;
