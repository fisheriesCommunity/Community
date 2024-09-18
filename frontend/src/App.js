import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Complaints from './Components/ComplaintDetails/ComplaintDetails'; // Make sure the path is correct
import Login from './Components/Login/Login';
import ComplaintForm from './Components/ComplaintForm/ComplaintForm';
import Process from './Components/Process/Process';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/add-complaint" element={<ComplaintForm />} />
                        <Route path="/process" element={<Process />} />
                        <Route path="/complaint-details" element={<Complaints />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
