import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import logo from '../../assets/myFlix-logo.png'

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-primary text-white"> {/* Changed background color */}
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: '30px', height: 'auto', objectFit: 'contain' }}
            className="navbar-logo"
            />
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-white">
                  <FaUser /> Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="text-white">
                  <FaHome /> Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`} className="text-white">
                  <FaUser /> Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="text-white">
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
