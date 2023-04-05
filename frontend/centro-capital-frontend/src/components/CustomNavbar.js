import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";
// import NavDropdown from 'react-bootstrap/NavDropdown';

class CustomNavbar extends Component {
    render() {
        return (
            <div className='sticky-bottom'>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Centro Capital</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={ Link } to="/">Home</Nav.Link>
                                <Nav.Link as={ Link } to="/about">About</Nav.Link>
                                <Nav.Link as={ Link } to="/insights">Insights</Nav.Link>
                                <Nav.Link as={ Link } to="/compare">Compare</Nav.Link>
                                <Nav.Link as={ Link } to="/centro-capital">Welcome</Nav.Link>
                                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Outlet/>
            </div>
        );
    }
}

export default CustomNavbar;