import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getData, getDataFiltered } from "../../share/domain/appServices";
import CustomDatePicker from "../DatePicker/DatePicker";
import { flushGifs, flushMessage } from "../../share/data/redux/appSlice";


const Navigation = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(null);
    const navigate = useNavigate();

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
        dispatch(getData());
    };

    const handleClick = () => {
        dispatch(flushGifs());
        navigate("/ticket/create")
    }

    const handleBrandClick = () => {
        dispatch(flushMessage());
        navigate("/");
    };

    return (
        <div>
            <Navbar className="bg-light" expand="lg">
                <Container>
                    <Navbar.Brand style={{cursor: 'pointer'}} onClick={handleBrandClick}>
                        <h1>Ticketera</h1>
                    </Navbar.Brand>
                    {location.pathname !== "/ticket/create" && (<Navbar.Toggle aria-controls="basic-navbar-nav" />)}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto color-nav flex-container">
                            {location.pathname === "/" && (
                                <div className="flex-container">
                                    <CustomDatePicker onDateChange={filterTicketsByDate} />
                                    <Container className="text-center">
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

                                    {activeFilter && (
                                        <button className="btn btn-secondary" onClick={resetFilters} style={{ marginRight: '10px' }}>
                                            Restablecer
                                        </button>
                                    )}
                                </div>
                            )}
                            {location.pathname !== "/ticket/create" && (
                                <button className="btn btn-primary text-center col-3 col-lg-auto ms-auto me-auto" onClick={() => handleClick()}>
                                    Crear Ticket
                                </button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;
