import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import AddStock from './Components/Add stock/AddStock';
//import ShowDetails from './Component/Details/Details';
//import Details from './Component/Details/Details';
import AddNewScock from './Components/Add new stock/AddNewScock';
import UpdateScock from './Components/UpdateScock/UpdateScock';



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
  );
}

export default App;
