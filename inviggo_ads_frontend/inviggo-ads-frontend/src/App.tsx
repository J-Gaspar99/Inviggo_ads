import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { authService } from './services/authService';
import AddAdModal from './components/AddAdModal';
import AdsTable from './components/AdsTable';
import { Container } from 'react-bootstrap';

interface UserData {
  username: string;
  token: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
    const user = authService.getCurrentUser();
      if (user) {
      setIsLoggedIn(true);
      setUserName(user.username);
    } else {
        authService.logout();
      setIsLoggedIn(false);
      setUserName('');
      }
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      setIsLoggedIn(true);
      setUserName(response.username);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignup = async (username: string, password: string, phoneNumber: string) => {
    try {
      const registerData = {
        username,
        password,
        phoneNumber
      };
      const response = await authService.register(registerData);
      setIsLoggedIn(true);
      setUserName(response.username);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUserName('');
    setShowSignup(false);
    setError('');
  };

  const toggleAuthForm = () => {
    setShowSignup(!showSignup);
    setError('');
  };

  return (
    <div className="App">
      <NavBar 
        isLoggedIn={isLoggedIn} 
        userName={userName}
        onLogout={handleLogout}
        onAddAd={() => setShowAddAdModal(true)}
        onToggleAuth={toggleAuthForm}
        showSignup={showSignup}
      />
      <Container>
        {!isLoggedIn ? (
          <div className="auth-container">
            {showSignup ? (
            <SignupForm onSignup={handleSignup} error={error} />
          ) : (
            <LoginForm onLogin={handleLogin} error={error} />
            )}
          </div>
        ) : (
          <>
          <div className="welcome-container">
            <h2>Welcome back, {userName}!</h2>
            <p>You are now logged in.</p>
          </div>
            <AdsTable />
          </>
        )}
      </Container>

      <AddAdModal 
        show={showAddAdModal}
        onHide={() => setShowAddAdModal(false)}
        onAdAdded={() => {
          setShowAddAdModal(false);
          const adsTable = document.querySelector('AdsTable');
          if (adsTable) {
            (adsTable as any).fetchAds(0);
          }
        }}
      />
    </div>
  );
}

export default App;
