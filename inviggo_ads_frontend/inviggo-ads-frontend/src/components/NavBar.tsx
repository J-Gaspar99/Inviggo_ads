import React from 'react';
import './NavBar.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NavBarProps {
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
  onAddAd: () => void;
  onToggleAuth: () => void;
  showSignup: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ 
  isLoggedIn, 
  userName, 
  onLogout, 
  onAddAd,
  onToggleAuth,
  showSignup 
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Inviggo Ads</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Button 
                  variant="outline-light" 
                  className="me-2"
                  onClick={onAddAd}
                >
                  Add Ad
                </Button>
                <Navbar.Text className="me-2">
                  Welcome, {userName}!
                </Navbar.Text>
                <Button variant="outline-light" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  className="me-2"
                  onClick={onToggleAuth}
                >
                  {showSignup ? 'Login' : 'Register'}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar; 