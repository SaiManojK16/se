import React, { useState } from 'react';
import axios from 'axios';


const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [showRegistration, setShowRegistration] = useState(false); // State to control whether to show the registration form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/login', {
        username,
        password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(username);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Removed the registration part */}
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary mb-3">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
