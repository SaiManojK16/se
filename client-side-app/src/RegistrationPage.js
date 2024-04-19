import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = ({ onRegistration }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/register', {
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
        email
      });
      // Assuming the server returns data upon successful registration, you can use it here
      const responseData = response.data;
      // Check if the response data indicates success
      if (responseData.success) {
        // Clear any previous errors
        setError('');
        // Perform any necessary UI updates or navigation
        onRegistration(username);
      } else {
        // If the response data does not indicate success, show an error message
        setError('Registration unsuccessful');
      }
    } catch (error) {
      // If an error occurs during the request, show an error message
      setError('Registration unsuccessful');
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
