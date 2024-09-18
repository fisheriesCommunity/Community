import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mailId: '',
        phoneNumber: '',
        complaintType: '',
        complaintDescription: '',
        file: null, // To  uploaded file
    });

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({}); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const validateForm = () => {
        let formErrors = {};

        // Name Validation: Non-empty and letters only
        if (!formData.name.trim()) {
            formErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            formErrors.name = 'Name should contain only letters';
        }

        // Email Validation: Check for valid email format
        if (!formData.mailId) {
            formErrors.mailId = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mailId)) {
            formErrors.mailId = 'Invalid email format';
        }

        // Phone Number Validation: Digits only and valid length
        if (!formData.phoneNumber.trim()) {
            formErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
            formErrors.phoneNumber = 'Phone number should be between 10 and 15 digits';
        }

        // Complaint Type Validation: Ensure a type is selected
        if (!formData.complaintType) {
            formErrors.complaintType = 'Complaint type is required';
        }

        // Complaint Description Validation: Ensure it's not too short
        if (!formData.complaintDescription.trim()) {
            formErrors.complaintDescription = 'Complaint description is required';
        } else if (formData.complaintDescription.trim().length < 20) {
            formErrors.complaintDescription = 'Description should be at least 20 characters long';
        }

        // File Validation: Ensure file is not too large or invalid type
        if (formData.file) {
            const fileSizeLimit = 2 * 1024 * 1024; // limited for 2MB
            if (formData.file.size > fileSizeLimit) {
                formErrors.file = 'File size should not exceed 2MB';
            }

            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedFileTypes.includes(formData.file.type)) {
                formErrors.file = 'Only JPG, PNG, or PDF files are allowed';
            }
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setStatus('Please fix the validation errors.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('mailId', formData.mailId);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('complaintType', formData.complaintType);
        formDataToSend.append('complaintDescription', formData.complaintDescription);
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }

        try {
            const response = await axios.post('http://localhost:8000/complaints', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                file: null,
            });
            setErrors({}); 
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
                {errors.name && <span className="error">{errors.name}</span>}
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
                {errors.mailId && <span className="error">{errors.mailId}</span>}
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
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
                {errors.complaintType && <span className="error">{errors.complaintType}</span>}
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
                {errors.complaintDescription && <span className="error">{errors.complaintDescription}</span>}
            </div>

            <div className="form-group">
                <label>Attach a File</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
                {errors.file && <span className="error">{errors.file}</span>}
            </div>

            <div className="form-actions">
                <button type="submit">Submit</button>
            </div>

            {status && <p>{status}</p>}
        </form>
    );
};

export default ComplaintForm;
