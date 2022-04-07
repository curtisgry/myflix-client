import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function NavbarTop() {
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
