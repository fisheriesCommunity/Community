import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  './BoatRD.css';


function Boatrdb({ _id, name, Numberof, phone }) {
  const history = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5059/users/${_id}`)
    .then(res=>res.data)
    .then(() =>history("/"))
    .then(() =>history("/BoatDetails"))
  }
  return (
    <div>
      <h1>User Display</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>Name: {name}</h1>
      <h1>Number: {Numberof}</h1>
      <h1>Phone: {phone}</h1>
      <Link to={`/BoatDetails/${_id}`}>update</Link>
      <button onClick={deleteHandler}>Delete</button>

      
    </div>
  );
}

export default Boatrdb;
