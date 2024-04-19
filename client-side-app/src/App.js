import React, { useState } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import MyAccountPage from './MyAccount';
import AdditionPage from './AdditionPage';
import InventoryPage from './InventoryPage';
import ProfilePage from './ProfilePage';
import API from './API';

const App = () => {
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('profile');

  const handleLogin = (username) => {
    setUser(username);
    setCurrentPage('myAccount');
  };

  const handleRegistration = () => {
    setLoginMode(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('profile');
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleRegistrationClick = () => {
    setCurrentPage('registration');
  };

  return (
    <div className="app">
      {user ? (
        <div>
          <div className="header">
            <div className="logo"><img src="https://clipart-library.com/images_k/superman-logo-transparent-background/superman-logo-transparent-background-22.png" alt="Logo" /></div>
            <div className="links">
              <button onClick={() => handleNavClick('profile')}>Profile</button>
              <button onClick={() => handleNavClick('myAccount')}>My Account</button>
              <button onClick={() => handleNavClick('addition')}>Addition</button>
              <button onClick={() => handleNavClick('inventory')}>Inventory</button>
              <button onClick={() => handleNavClick('API')}>API</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="content">
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'myAccount' && <MyAccountPage username={user} />}
            {currentPage === 'addition' && <AdditionPage />}
            {currentPage === 'inventory' && <InventoryPage />}
            {currentPage === 'registration' && <RegistrationPage />}
            {currentPage === 'API' && <API />}
          </div>
        </div>
      ) : (
        <div className="auth-container d-flex flex-column justify-content-center align-items-center"> {/* Use flexbox */}
          {loginMode ? (
            <>
              <LoginPage onLogin={handleLogin} />
              {/* Move "Don't have an account" button below */}
              <div className="text-center mt-3">
                <button onClick={() => setLoginMode(false)} className="btn btn-primary">
                  Don't have an account
                </button>
              </div>
            </>
          ) : (
            <>
              <RegistrationPage onRegistration={handleRegistration} />
              {/* Move "Switch to Login" button below */}
              <div className="text-center mt-3"> 
                <button onClick={() => setLoginMode(true)} className="btn btn-primary">
                  Switch to Login
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
