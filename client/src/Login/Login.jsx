
import React from 'react';
import { useLocation } from 'react-router-dom';

function Login() {
  const search = useLocation().search;
  const role = new URLSearchParams(search).get('role');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    e.target.reset()
  }

  return (
    <div className="login-container">
      <h2>{role === 'employer' ? 'Employer' : 'Job Seeker'} Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" >Login</button>
      </form>
    </div>
  );
}

export default Login;
