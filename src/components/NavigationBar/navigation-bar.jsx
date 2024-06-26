import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
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
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users/:username">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Nav className="ms-auto custom-nav">
              <Nav.Link disabled>{user.username}</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>
                Logout ⍈
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}