import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const Home = () => {
    const { data: tickets } = useSelector(state => state.app);

    const messageStyle = {
        textAlign: "center",
        fontSize: "1.5rem"
    };

    return (
        <div>
            <Container className="py-5">
                {tickets.length === 0 ? (
                    <p style={messageStyle}>No hay tickets disponibles.</p>
                ) : (
                    <div className="cards-layout">
                        {tickets.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card data={item} />
                            </Col>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;
