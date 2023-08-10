import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { useAccount, useContractRead } from "wagmi";
import useDebounce from '../../hooks/UseDebounce';
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useEthNameContext } from "../../context/EthNameContext";

const GetDomain = () => {
    const navigate = useNavigate();
    const [isTrying, setIsTrying] = useState(false);
    const [domainName, setDomainName] = useState("");
    const { verifyEthName } = useEthNameContext()
    
    return (
        <Row className="text-center">
            <Col sm="12">
                <h4>If you already have a registered domain name asscociated with
                    your account please enter it or register a new domain on our contract.</h4>
            </Col>
            <Col sm="12">
                <Form>     
                    <FloatingLabel
                        controlId="floating_domainName"
                        label="Enter Domain Name"
                    >
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => {
                                setDomainName(e.target.value);
                            }}
                            value={domainName}
                            placeholder="Enter your domain name"
                        />
                    </FloatingLabel>
                    <Button onClick={async () => {
                        setIsTrying(true);
                        try {
                            const verifiedName = await verifyEthName(domainName);
                            if (verifiedName) {
                                toast.success(`Your ENS is verified!`);
                                navigate("/save/id")
                            } else {
                                toast.error('There is something wrong! Does this domain name exists and belong to you?');
                                setDomainName("");                                
                            }
                        } catch (error) {
                            toast.error(error);
                            console.error(error)
                            setDomainName("");                                
                        }
                        setIsTrying(false);
                    }}
                    disabled={isTrying}>Use this</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default GetDomain;