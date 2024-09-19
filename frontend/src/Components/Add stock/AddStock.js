import React ,{useState,useEffect}from 'react'
//import Nav from "../Nav/Nav.js";
import Details from '../Details/Details.js';
import axios from "axios";

const URL = "http://localhost:5005/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};


function AddStock() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      <h1>Stock Data Page</h1>
      <div>
        {users && users.map ((user,i) => (
          <div key={i}>
          <Details user={user}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddStock
