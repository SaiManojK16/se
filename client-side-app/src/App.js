// App.js
import React, { useState } from 'react';
import './App.css'; // Assume your CSS file for styling
import Profile from './ProfilePage'; // Import the Profile component
import AdditionPage from './AdditionPage'; // Import the AdditionPage component

// Header component
const Header = ({ setPage }) => {
  return (
    <div className="header">
      <div className="logo">
        <img src="https://clipart-library.com/images_k/superman-logo-transparent-background/superman-logo-transparent-background-22.png" alt="Logo" />
      </div>
      <div className="links">
        <a href="#" onClick={() => setPage('profile')}>Profile</a>
        <a href="#" onClick={() => setPage('addition')}>Addition Page</a>
      </div>
    </div>
  );
}

// Main App component
const App = () => {
  const [page, setPage] = useState('profile');

  return (
    <div className="app">
      <Header setPage={setPage} />
      <div className="content">
        {page === 'profile' ? <Profile /> : <AdditionPage />}
      </div>
    </div>
  );
}

export default App;
