import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

function EmployerLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:8000/api/employer/login', {
        email,
        password,
        role: 'employer'
      });

      if (response.status === 200) {
        alert('Employer login successful');
        setUser(response.data.user);
        navigate('/dashboard/employer');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  return (
    <div className="container-full min-h-[100vh]">
      <div className="login-container">
        <h2>Employer Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default EmployerLogin;