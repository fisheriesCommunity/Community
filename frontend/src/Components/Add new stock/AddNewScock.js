import axios from "axios";
import "./AddNewScock.css"
import React, { useState } from "react";
import { useNavigate } from "react-router";

function AddNewScock() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    BoatID: "",
    FishType: "",
    Quantity: "",
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
    sendRequest().then(() => history('addstock'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5005/users", {
      BoatID: String(inputs.BoatID),
      FishType: String(inputs.FishType),
      Quantity: Number(inputs.Quantity),
    }).then(res => res.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="BoatID" value={inputs.BoatID} onChange={handleChange} required placeholder="Boat ID" />
        <input type="text" name="FishType" value={inputs.FishType} onChange={handleChange} required placeholder="Fish Type" />
        <input type="number" name="Quantity" value={inputs.Quantity} onChange={handleChange} required placeholder="Quantity" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNewScock;
