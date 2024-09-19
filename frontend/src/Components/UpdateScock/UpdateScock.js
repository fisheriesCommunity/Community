import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import { useNavigate } from 'react-router'

function UpdateScock() {
    const [inputs,setInputs]=useState ({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
const fetchHandler = async () => {
    await axios
    .get(`http://localhost:5005/users/${id}`)
    .then((res)=> res.data)
    .then((data)=>setInputs(data.user));
};
fetchHandler();
    },[id]);

    //updated and insert data
const sendRequest = async () => {
    await axios
    .put(`http://localhost:5005/users/${id}`,{

        BoatID: String(inputs.BoatID),
        FishType: String(inputs.FishType),
        Quantity: Number(inputs.Quantity),

    })
    .then((res) => res.data);
};

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


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="BoatID" value={inputs.BoatID} onChange={handleChange} required placeholder="Boat ID" />
        <input type="text" name="FishType" value={inputs.FishType} onChange={handleChange} required placeholder="Fish Type" />
        <input type="number" name="Quantity" value={inputs.Quantity} onChange={handleChange} required placeholder="Quantity" />
        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default UpdateScock
