import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Dropdown, DropdownButton, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getData, getDataFiltered } from "../../share/domain/appServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import CustomDatePicker from "../DatePicker/DatePicker";


const Navigation = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(null);

    const handleFilterChange = (filterType, filterValue) => {
        const name = filterValue.split('=')[0]
        const value = filterValue.split('=')[1]
        const params = {
            [name]: value
        };
        setActiveFilter(filterType);
        dispatch(getDataFiltered(params));
    };

    const filterTicketsByDate = (dateRange) => {

        if (!dateRange[0] && !dateRange[1]) {
            dispatch(getData());
            return
        }

        if (!dateRange[0] || !dateRange[1]) {
            return
        }

        const [startDate, endDate] = dateRange;

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const params = {
            "createdAt[gte]": formattedStartDate,
            "createdAt[lte]": formattedEndDate,
        };

        dispatch(getDataFiltered(params))

    };

    const resetFilters = () => {
        setActiveFilter(null);
        dispatch(getData()); // Restablecer a la vista sin filtros
    };

    return (
        <div>
            <Navbar className="bg-light" expand="lg">
                <Container>
                    <Navbar.Brand className="logo" href="/">
                        <h1>Ticketera</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto color-nav" style={{ width: activeFilter ? '50%' : '40%' }}>

                            <CustomDatePicker onDateChange={filterTicketsByDate} />
                            <div>
                                <Container>
                                    <DropdownButton id="dropdown-basic-button" title="Filtros">
                                        <DropdownButton
                                            id={"dropdown-button-estado"}
                                            drop="end"
                                            variant="light"
                                            title={"Estado"}
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('estado', 'isDone[eq]=1')}>Finalizados</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleFilterChange('estado', 'isDone[eq]=0')}>Pendientes</Dropdown.Item>
                                        </DropdownButton>

                                        <DropdownButton
                                            id={"dropdown-button-difficulty"}
                                            drop="end"
                                            variant="light"
                                            title="Dificulad"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('dificultad', 'difficultyLevel[eq]=facil')}>Fácil</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleFilterChange('dificultad', 'difficultyLevel[eq]=media')}>Media</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleFilterChange('dificultad', 'difficultyLevel[eq]=dificil')}>Difícil</Dropdown.Item>
                                        </DropdownButton>
                                    </DropdownButton>
                                </Container>
                            </div>
                            {activeFilter && (
                                <button className="btn btn-secondary" onClick={resetFilters} style={{ marginRight: '10px' }}>
                                    Restablecer
                                </button>
                            )}
                            {location.pathname !== "/ticket/create" && (
                                <Link className="btn btn-primary" style={{ width: '30%', height: '50%' }} to="/ticket/create">
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
