import React, { useEffect, useState, useRef } from 'react';

import axios from "axios";
import Request from '../Request/Request';
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:5000/requests";


const fetchHandler = async () => {
  return await axios
    .get(URL)
    .then((res) => res.data);
  
}


function Requests() {

  const [requests, setRequests] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setRequests(data.requests));
  }, [])

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Loan Requests Report",
    onAfterPrint: () => alert("Loan Requests Report Successfully Downloaded!"),
    
  })

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredRequests = data.requests.filter((request) => 
        Object.values(request).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ))
        setRequests(filteredRequests);
        setNoResults(filteredRequests.length === 0);
    });
  };

  const handleSendReport = () => {
    //Create the WhatsApp Chat URL
    const phoneNumber = "+94702345133";
    const message = "Your Upcoming Payment is due!";
    const WhatsAppURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    //open the WhatsApp URL in a new Window
    window.open(WhatsAppURL, "_blank");
  }

  return (
    <div>
     <h1>All Loan Requests of the Community</h1>

     <input onChange={(e)=> setSearchQuery(e.target.value)} 
     type="text" 
     name="Search"
     placeholder="Search Request Details" >
     </input>

     <button onClick={handleSearch}>Search</button>

     {noResults ?(
      <div>
      <p>No Requests Found</p>
      </div>


     ):(
     <div ref={ComponentsRef}>
      {requests && requests.map((request, i) => (
        <div key={i}>
          <Request request= {request}/>
          </div>
        
      ))}
     </div>
     )}
     <button onClick={handlePrint}>Download Report</button>
     <br></br><br></br>
     <button onClick={handleSendReport}>Send WhatsApp Message</button>
     <br></br><br></br>
    </div>
  )
}

export default Requests
