import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams  } from 'react-router'
import { useNavigate } from 'react-router'

function UpData() {

const [inputs, setInputs] = useState({});
const history = useNavigate();
const id = useParams ().id;

useEffect(()=>{
  const fetchHandler = async ()=>{
    await axios.get(`http://localhost:5059/users/${id}`)
    .then((res)=> res.data)
    .then((data)=> setInputs(data.user));
  };
  fetchHandler();
},[id]);

const sendRequest = async () => {
  await axios.put(`http://localhost:5059/users/${id}`,{
    name: String(inputs.name),
    Numberof: Number(inputs.Numberof),
    phone: Number(inputs.phone),
    
  })
.then((res) => res.data);

};

const handleChange = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(inputs);
  sendRequest().then(() => 
  history('/BoatDetails'));
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

      

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default UpData







