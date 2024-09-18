import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router here
import BoatRD from './Components/BoatRDs/BoatRD';
import TripD from './Components/TripD/TripD';
import TripR from './Components/TripR/TripR';
import BoatR from './Components/BoatR/BoatR';
import UpData from './Components/Updata/UpData';
import BoatHome from './Components/BoatHome/BoatHome';

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
    </div>
  );
}

export default App;
