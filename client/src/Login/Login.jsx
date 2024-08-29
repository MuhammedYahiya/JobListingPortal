import React, { useContext } from "react";
import { Await, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

function Login() {
  const search = useLocation().search;
  const role = new URLSearchParams(search).get("role");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    e.target.reset();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful");
        setUser(response.data.user);
        console.log(response.data);
        navigate(`/dashboard/${role}`); // Navigate to the dashboard or another page
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="container-full min-h-[100vh]">
      <div className="login-container">
        <h2>{role === "employer" ? "Employer" : "Job Seeker"} Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
