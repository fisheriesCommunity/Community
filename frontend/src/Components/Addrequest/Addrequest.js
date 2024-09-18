import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Addrequest() {
  const navigate = useNavigate(); 
 
  const [inputs, setInputs] = useState({
    name: "",
    membership: "",
    gmail: "",
    amount: ""
  });

  const handleChange = (event) => {
    setInputs(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Request Added Successfully");
    navigate('/requestdetails');
   
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/requests",{
      name: String (inputs.name),
      membership: Number (inputs.membership),
      gmail: String (inputs.gmail),
      amount: Number (inputs.amount),
   
    }).then(res =>res.data);
  }

  return (
    <div>
      <h1>Add Request</h1>
      <form onSubmit={handleSubmit}>

        <label>Name: </label>
        <br/>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required></input>
        <br></br>
        <br></br>

        <label>Membership: </label>
        <br/>
        <input type="number" name="membership" onChange = {handleChange} value={inputs.membership} required></input>
        <br></br>
        <br></br>

        <label>Gmail: </label>
        <br/>
        <input type="email" name="gmail" onChange = {handleChange} value={inputs.gmail} required></input>
        <br></br>
        <br></br>

        <label>Amount: </label>
        <br/>
        <input type="number" name="amount" onChange = {handleChange} value={inputs.amount} required></input>
        <br></br>
        <br></br>
      
       <button>Submit</button>
 
      </form>
    </div>
  )
}

export default Addrequest
