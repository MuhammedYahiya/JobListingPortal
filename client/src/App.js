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
import EmployerProfile from "./Login/EmployerProfile";
import { AuthorisedRoute } from "./Login/UserContext";
import ProfilePage from "./jobseeker/Leftsidebar/ProfilePage/ProfilePage";
import EmployerProfileJobs from "./Login/EmployerProfileJobs";
import Application from "./jobseeker/Leftsidebar/Applications/Application";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register/employer" element={<EmployerRegister />} />
        <Route path="/register/jobseeker" element={<JobSeekerRegister />} />
        {/* <Route path="/dashboard/jobseeker" element={<JObSeekerDash />} /> */}
        <Route path="/login/employer" element={<EmployerLogin />} />
        <Route path="/login/jobseeker" element={<JobSeekerLogin />} />

        <Route
          path="/dashboard/employer"
          element={<AuthorisedRoute element={<EmployerDash />} />}
        />
        <Route
          path="/dashboard/Homesearch"
          element={<AuthorisedRoute element={<Homesearch />} />}
        />

        <Route
          path="/dashboard/employer/create"
          element={<AuthorisedRoute element={<CompanyCreate />} />}
        />
        <Route
          path="/dashboard/employer/profile"
          element={<AuthorisedRoute element={<EmployerProfile />} />}
        />

        <Route
          path="/dashboard/employer/jobs"
          element={<AuthorisedRoute element={<EmployerProfileJobs />} />}
        />

        <Route
          path="/dashboard/Homesearch/profile"
          element={<AuthorisedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/dashboard/Homesearch/applications"
          element={<AuthorisedRoute element={<Application />} />}
        />
      </Routes>
    </>
  );
}

export default App;
