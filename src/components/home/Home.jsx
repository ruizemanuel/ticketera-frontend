import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const Home = () => {
    const { data: tickets } = useSelector(state => state.app);

    const messageStyle = {
        textAlign: "center",
        fontSize: "1.5rem"
    };

    const cardsLayout = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridRowGap: "80px",
        gridColumnGap: "40px",
        maxWidth: "900px",
        margin: "0 auto 30px"
    };

    return (
        <div>
            <Container className="py-5">
                {tickets.length === 0 ? (
                    <p style={messageStyle}>No hay tickets disponibles.</p>
                ) : (
                    <Row style={cardsLayout}>
                        {tickets.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card data={item} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Home;
