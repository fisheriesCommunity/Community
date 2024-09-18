import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router here
import BoatRD from './components/BoatRDs/BoatRD';
import TripD from './components/TripD/TripD';
import TripR from './components/TripR/TripR';
import BoatR from './components/BoatR/BoatR';
import UpData from './components/Updata/UpData';
import BoatHome from './components/BoatHome/BoatHome';

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
