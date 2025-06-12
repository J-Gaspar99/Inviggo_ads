import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { authService } from './services/authService';
import AddAdModal from './components/AddAdModal';
import AdsTable from './components/AdsTable';
import { Container } from 'react-bootstrap';
import { getValue } from '@testing-library/user-event/dist/utils';
import { alignProperty } from '@mui/material/styles/cssUtils';

interface UserData {
  username: string;
  token: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const adsTableRef = useRef<{ refreshAds: () => void }>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const user = authService.getCurrentUser();
      setUserName(user);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      setIsAuthenticated(true);
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
      setIsAuthenticated(true);
      setUserName(response.username);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserName(null);
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
        isLoggedIn={isAuthenticated} 
        userName={userName||''}
        onLogout={handleLogout}
        onAddAd={() => setShowAddAdModal(true)}
        onToggleAuth={toggleAuthForm}
        showSignup={showSignup}
      />
      <Container>
        {!isAuthenticated ? (
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
            <AdsTable ref={adsTableRef}
                      userName={userName || ''}
            />
          </>
        )}
      </Container>

      <AddAdModal 
        show={showAddAdModal}
        onHide={() => setShowAddAdModal(false)}
        onAdAdded={() => {
          setShowAddAdModal(false);
          adsTableRef.current?.refreshAds();
        }}
      />
    </div>
  );
}

export default App;
