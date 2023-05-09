import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { initGA, logPageView } from '../analytics';
import { BsFillHouseHeartFill, BsSearch , BsGraphUp , BsFillPatchQuestionFill, BsClipboardCheckFill } from "react-icons/bs";

const CustomNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Initialize Google Analytics
        initGA('UA-266511060-2');
        logPageView(location);
    }, []);

    const handleNavItemClick = (path) => {
       navigate(path);
        logPageView(path);
    };
    
    return (
        <div className='sticky-bottom'>
            <Navbar bg="light" expand="lg">
            <img src="favicon.ico" className="img-responsive rounded float-left" width="5%" alt="Logo"></img>
                <Container>
                    <Navbar.Brand onClick={() => handleNavItemClick('/')}>Centro Capital</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link  onClick={() => handleNavItemClick('/')}><BsFillHouseHeartFill />Home</Nav.Link>
                            <Nav.Link  onClick={() => handleNavItemClick('/insights')}><BsSearch />Insights</Nav.Link>
                            <Nav.Link  onClick={() => handleNavItemClick('/compare')}><BsGraphUp />Compare</Nav.Link>
                            <Nav.Link  onClick={() => handleNavItemClick('/about')}><BsFillPatchQuestionFill />About</Nav.Link>
                            <Nav.Link  onClick={() => handleNavItemClick('/feedback')}> <BsClipboardCheckFill/>Feedback</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
}


export default CustomNavbar;