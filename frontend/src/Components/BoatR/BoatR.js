import React, { useState } from 'react';
import './BoatR.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BoatR() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    Numberof: '',
    phone: '',
    category: '', // Add category state
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate('/BoatDetails'));
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5059/users", {
        name: String(inputs.name),
        Numberof: Number(inputs.Numberof),
        phone: Number(inputs.phone),
        category: inputs.category, // Include category in the request
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    
    <form className="boat-registration-form" onSubmit={handleSubmit}>
      <h2>Boat Registration Form</h2>

      <div className="form-group">
        <label>Enter Full Name:</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Enter Government Registration Number:</label>
        <input
          type="text"
          name="Numberof"
          value={inputs.Numberof}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={inputs.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Select Boat Category:</label>
        <select
          name="category"
          value={inputs.category}
          onChange={handleChange}
          required
        >
          <option value="">--Select Category--</option>
          <option value="ocean">Ocean</option>
          <option value="offshore">Offshore</option>
          <option value="inshore">Inshore</option>
        </select>
      </div>

      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default BoatR;
