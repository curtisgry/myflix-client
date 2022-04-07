import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function NavbarTop({ user }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Logo will go here */}
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/genres">
              <Nav.Link as="li">Genres</Nav.Link>
            </Link>
            <Link to="/directors">
              <Nav.Link as="li">Directors</Nav.Link>
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            {user ? (
              <>
                <Navbar.Text>Welcome </Navbar.Text>
                <Link to={`/users/${user}`}>
                  <Nav.Link as="li">{user}</Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link to="/users/login">
                  <Nav.Link as="li">Log In</Nav.Link>
                </Link>
                <Link to="/users/register">
                  <Nav.Link as="li">Sign Up</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavbarTop.propTypes = {
  user: PropTypes.string,
};

export default NavbarTop;
