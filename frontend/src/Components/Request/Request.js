import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Request(props) {
  const {_id, name, membership, gmail, amount} = props.request;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this request?');
    if (confirmed) {
      try{
        await axios.delete(`http://localhost:5000/requests/${_id}`);
        window.alert("Request Deleted Successfully");
        navigate('/requestdetails');
        window.location.reload(); // Reload the page

      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };
  return (
    <div>
      <h2>Loan Request Details</h2>
      <br></br>
      <h3>ID: {_id}</h3>
      <h3>Name: {name}</h3>
      <h3>Membership: {membership}</h3>
      <h3>Gmail: {gmail}</h3>
      <h3>Amount: {amount}</h3>
      <Link to={`/requestdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
      <br></br><br></br><br></br><br></br>
    </div>
  )
}

export default Request
