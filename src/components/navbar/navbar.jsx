import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import './navbar.scss';

function NavbarTop({ user }) {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        {/* Logo will go here */}
        <Link to="/">
          <Navbar.Brand>myFlix</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <Nav.Link as="li">All</Nav.Link>
            </Link>
            <Link to="/genres/Action">
              <Nav.Link as="li">Genres</Nav.Link>
            </Link>
            <Link to="/directors/Christopher Nolan">
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
                <Link to="/register">
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
