import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';

import GetDomain from "./GetDomain";
import RegisterDomain from "./RegisterDomain";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const EthNameGetOrSet = () => {
    const [form, setForm] = useState("get");
    const changeActiveForm = (formName) => setForm(formName);
    return (
        <Container fluid className="myForm">     
            <Row>
                <Col sm={12} className="text-center my-4">
                    <h4>Get your ETH domain name used to verify your Wallet Address.</h4>
                    <h5>The Wallet Address You want to verify buy a domain name with it then in further verification process use this domain.</h5>
                </Col>
            </Row>
            <Nav fill variant="pills" >
                <Nav.Item>
                    <Nav.Link onClick={() => changeActiveForm("get")} className={form === "get" ? "active" : null}>Get My Domain</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={form === "set" ? "active": null} onClick={() => changeActiveForm("set")}>Register New Domain</Nav.Link>
                </Nav.Item>
            </Nav>

            <Row>
                <Col sm={12} className="my-4">
                    {form === "get" ? <GetDomain /> : <RegisterDomain setForm={setForm} />}
                </Col>
            </Row>
        </Container>
    );
}

export default EthNameGetOrSet;