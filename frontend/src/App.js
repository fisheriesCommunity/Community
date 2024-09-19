import React from 'react';
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
