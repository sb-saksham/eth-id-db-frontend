import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';

import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CenteredButton from "../UI/CenteredButton";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const LogInSignUp = ({}) => {
    const {address: walletAddress} = useAccount();
    const [form, setForm] = useState("login");
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useAuthContext();
    const changeActiveForm = (formName) => setForm(formName);
    useEffect(() => {
        if (walletAddress !== undefined && user && user.token) {
            navigate(location.state.from || '/');
        }
     }, [walletAddress, user])
    return (
        <Container fluid className="myForm">
            {walletAddress === undefined ? (
                <CenteredButton><ConnectButton/></CenteredButton>
            ) : null}     
            {!user || !user?.token ?
            (<><Row>
            <Col sm={12} className="text-center my-4"><h4>Authorize yourself</h4></Col>
            </Row>
            <Nav fill variant="pills" >
                <Nav.Item>
                    <Nav.Link onClick={() => changeActiveForm("login")} className={form === "login" ? "active" : null}>Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={form === "signup" ? "active": null} onClick={() => changeActiveForm("signup")}>Sign Up</Nav.Link>
                </Nav.Item>
            </Nav>

            <Row>
                <Col sm={12} className="my-4">
                    {form === "login" ? <LoginForm /> : <SignUpForm setForm={setForm} />}
                </Col>
                    </Row></>) : <CenteredButton><h4>You already have been logged in with Account. {walletAddress === undefined ? <p>Please Connect Your Wallet</p> : <p>You also have your wallet connected!</p>} </h4></CenteredButton>}
            {walletAddress !== undefined && user && user.token ? <CenteredButton><Button variant="primary" onClick={() => navigate('/')}>Home {"->"}</Button></CenteredButton>: null}
        </Container>
    );
}

export default LogInSignUp;