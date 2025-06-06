import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { authService } from './services/authService';
import AddAdModal from './components/AddAdModal';
import axios from 'axios';

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
    const user = authService.getCurrentUser();
    if (user && user.token) {
      setIsLoggedIn(true);
      setUserName(user.username);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await authService.login(username, password);
      
      setIsLoggedIn(true);
      setUserName(userData.username);
      setShowSignup(false);
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. An unexpected error occurred.');
      }
      setIsLoggedIn(false);
      setUserName('');
      throw err;
    }
  };

  const handleSignup = async (username: string, password: string, phoneNumber: string) => {
    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', {
        username,
        password,
        phoneNumber
      });
      
      console.log('Signup successful:', response.data);
      await handleLogin(username, password);
      setError('');
    } catch (err) {
      console.error('Signup error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. An unexpected error occurred.');
      }
      throw err;
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
      <header className="App-header">
        {!isLoggedIn ? (
          showSignup ? (
            <SignupForm onSignup={handleSignup} error={error} />
          ) : (
            <LoginForm onLogin={handleLogin} error={error} />
          )
        ) : (
          <div className="welcome-container">
            <h2>Welcome back, {userName}!</h2>
            <p>You are now logged in.</p>
          </div>
        )}
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <AddAdModal 
        show={showAddAdModal}
        onHide={() => setShowAddAdModal(false)}
        onAdAdded={() => {
          setShowAddAdModal(false);
        }}
      />
    </div>
  );
}

export default App;
