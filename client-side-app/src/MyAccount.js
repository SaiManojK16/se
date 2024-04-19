// MyAccountPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myAccountPage.css';
const MyAccountPage = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data using the provided username
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/user/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return (
    <div>
      <h2>My Account</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user data fields as needed */}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default MyAccountPage;
