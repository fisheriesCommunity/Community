import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function Updaterequest() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/requests/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.request));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/requests/${id}`, {
        name: String(inputs.name),
        membership: Number(inputs.membership),
        gmail: String(inputs.gmail),
        amount: Number(inputs.amount),
      })
      .then((res) => res.data);
  };

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendRequest();
    navigate('/requestdetails');
  };

  return (
    <div>
      <h1>Update Request</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        ></input>
        <br></br>
        <br></br>

        <label>Membership: </label>
        <br />
        <input
          type="number"
          name="membership"
          onChange={handleChange}
          value={inputs.membership}
          required
        ></input>
        <br></br>
        <br></br>

        <label>Gmail: </label>
        <br />
        <input
          type="email"
          name="gmail"
          onChange={handleChange}
          value={inputs.gmail}
          required
        ></input>
        <br></br>
        <br></br>

        <label>Amount: </label>
        <br />
        <input
          type="number"
          name="amount"
          onChange={handleChange}
          value={inputs.amount}
          required
        ></input>
        <br></br>
        <br></br>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Updaterequest;
