import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import logo from '../../assets/myFlix-logo.png'
import './navigation-bar.scss'; // Import custom CSS for NavigationBar

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-primary text-black navbar-full-width"> {/* Add custom class */}
      <Navbar.Brand as={Link} to="/" className="fw-bold text-black navbar-title">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '40px', height: 'auto', objectFit: 'contain' }}
          className="navbar-logo"
        />
        MyFlix App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {!user && (
            <>
              <Nav.Link as={Link} to="/login" className="text-black">
                <FaSignInAlt /> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="text-black">
                <FaUser /> Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to="/" className="text-black">
                <FaHome /> Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/users/${user.Username}`} className="text-black">
                <FaUser /> Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut} className="text-black">
                <FaSignOutAlt /> Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
