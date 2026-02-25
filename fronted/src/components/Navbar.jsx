import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar as RBNavbar, Nav, Container } from 'react-bootstrap'

const Navbar = () => {
  return (
    <RBNavbar expand="md" bg="light" className="shadow-sm glass-nav border-0">
      <Container>
        <RBNavbar.Brand className="fw-bold">NodeTIPS</RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="main-nav" />
        <RBNavbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/auth">
              Login / Signup
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  )
}

export default Navbar
