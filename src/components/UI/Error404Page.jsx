import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
    const navigate = useNavigate();
    return (
        <Container fluid className="text-center">
            <h2>404 Page Not Found  </h2>
            <Button variant="success" onClick={()=>navigate('/')}>Go to Home</Button>
        </Container>
    );
}

export default Error404Page;