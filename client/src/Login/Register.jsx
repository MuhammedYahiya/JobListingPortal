import React from 'react';
import { useLocation } from 'react-router-dom';

function Register() {
  const search = useLocation().search;
  const role = new URLSearchParams(search).get('role');

  return (
    <div className="register-container">
      <h2>{role === 'employer' ? 'Employer' : 'Job Seeker'} Registration</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
