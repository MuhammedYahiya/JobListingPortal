// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login/Login";
import Home from "./Login/Home";
import Register from "./Login/Register";
import JObSeekerDash from "./Login/JObSeekerDash";
import EmployerDash from "./Login/EmployerDash";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/jobseeker" element={<JObSeekerDash />} />
          <Route path="/dashboard/employer" element={<EmployerDash />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
