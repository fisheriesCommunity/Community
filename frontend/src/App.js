import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Complaints from './components/ComplaintDetails'; // Make sure the path is correct
import Login from './components/Login';
import ComplaintForm from './components/ComplaintForm';
import Process from './components/Process';
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
