import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router here
import BoatRD from './Components/BoatRDs/BoatRD';
import TripD from './Components/TripD/TripD';
import TripR from './Components/TripR/TripR';
import BoatR from './Components/BoatR/BoatR';
import UpData from './Components/Updata/UpData';
import BoatHome from './Components/BoatHome/BoatHome';
import { Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import AddStock from './Components/Add stock/AddStock';
//import ShowDetails from './Component/Details/Details';
//import Details from './Component/Details/Details';
import AddNewScock from './Components/Add new stock/AddNewScock';
import UpdateScock from './Components/UpdateScock/UpdateScock';
import {Route, Routes } from 'react-router';
import './App.css';
import Loan from './Components/Loan/Loan';
import Nav from './Components/Nav/Nav';
import Addrequest from './Components/Addrequest/Addrequest';
import Requests from './Components/Requestdetails/Requests';
import Updaterequest from './Components/Updaterequest/Updaterequest';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Contactadmin from './Components/Contactadmin/Contactadmin';
import Uploadcollateral from './Components/Uploadcollateral/Uploadcollateral';


function App() {
  return (
    <React.Fragment>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mainhome" element={<Home />} />
      <Route path="/addstock" element={<AddStock />} />
      <Route path="/AddNewStock" element={<AddNewScock />} />
      <Route path="/addstock/:id" element={<UpdateScock />} />


    </Routes>
    </React.Fragment>


function App() {
  return (
    <div>
      
      <BoatHome />
      <Routes>
        <Route path="/Boats" element={<BoatHome />} />
        <Route path="/BoatRegistration" element={<BoatR />} />
        <Route path="/BoatDetails" element={<BoatRD />} />
        <Route path="/BoatDetails/:id" element={<UpData />} />
        <Route path="/Schedule" element={<TripR />} />
        <Route path="/ScheduleDetails" element={<TripD />} />
      </Routes>
      <Nav />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Loan />}/>
          <Route path="/mainloan" element={<Loan />}/>
          <Route path="/addrequest" element={<Addrequest />}/>
          <Route path="/requestdetails" element={<Requests />}/>
          <Route path="/regi" element={<Register />}/>
          <Route path="/log" element={<Login />}/>
          <Route path="/contact" element={<Contactadmin />}/>
          <Route path="/upload" element={<Uploadcollateral />}/>
          <Route path="/requestdetails/:id" element={<Updaterequest />}/>
        
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
