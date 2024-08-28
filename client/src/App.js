// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';
import Home from './Login/Home';
import Register from './Login/Register';
import JobSeekers from './Login/JobSeekers';




function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;
