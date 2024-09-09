import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Login/Home";

// import JObSeekerDash from "./Login/JObSeekerDash";
import EmployerDash from "./Login/EmployerDash";
import EmployerRegister from "./Login/EmployerRegister";
import JobSeekerRegister from "./Login/JobSeekerRegister";
import EmployerLogin from "./Login/EmployerLogin";
import JobSeekerLogin from "./Login/JobSeekerLogin";
import Homesearch from "./jobseeker/Homesearch";
import CompanyCreate from "./Login/CompanyCreate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register/employer" element={<EmployerRegister />} />
          <Route path="/register/jobseeker" element={<JobSeekerRegister />} />
          {/* <Route path="/dashboard/jobseeker" element={<JObSeekerDash />} /> */}
          <Route path="/dashboard/employer" element={<EmployerDash />} />
          <Route path="/login/employer" element={<EmployerLogin />} />
          <Route path="/login/jobseeker" element={<JobSeekerLogin />} />
          <Route path="/dashboard/Homesearch" element={<Homesearch />} />
          <Route path="/dashboard/employer/create" element={<CompanyCreate />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
