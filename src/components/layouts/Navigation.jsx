import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navigation = () => {

    const location = useLocation();

    return (
        <div>
            <Navbar className="bg-light" expand="lg">
                <Container>
                    <Navbar.Brand className="logo" href="/">
                        <h1>Ticketera</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto color-nav">
                            {location.pathname !== "/ticket/create" && (
                                <Link className="btn btn-primary" to="/ticket/create">
                                    Crear Ticket
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;
