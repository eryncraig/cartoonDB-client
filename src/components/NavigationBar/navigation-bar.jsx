import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2" aria-label="navigation-bar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Cartoon Database
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" aria-label="Link to Homepage">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users/:username" aria-label="Link to Profile">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Nav className="ms-auto custom-nav">
              <Nav.Link disabled>{user.username}</Nav.Link>
              <Nav.Link onClick={onLoggedOut} aria-label="Click here to logout">
                Logout ⍈
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}