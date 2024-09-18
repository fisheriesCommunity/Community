import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Boatrdb from './boatrdb';  // Corrected import
import Nav from "../Nav/Nav";
import  './BoatRD.css';
import {useReactToPrint} from "react-to-print";




const URL = "http://localhost:5059/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function BoatRD() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

const componentsRef = useRef();
const handleprint = useReactToPrint({
     content: () => componentsRef.current,
     DocumentTitle:"Boat Report",
     onafterprint:()=>alert("Boat Details report Successfully Download!"),
})



  return (
    <div ref={componentsRef}>
      <Nav />
      {users && users.map((user, i) => (
        <Boatrdb
          key={i}
          _id={user._id}
          name={user.name}
          Numberof={user.Numberof}
          phone={user.phone}
        />
      ))}

      <button onClick={handleprint}>Download Report</button>
    </div>
  );
}

export default BoatRD;
