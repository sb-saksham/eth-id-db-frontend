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
import useLocalStorage from "../../hooks/useLocalStorage";
import IdDb from "../../artifacts/contracts/idDb.sol/IdDb.json";
import { useEthNameContext } from "../../context/EthNameContext";

const ContractDetails = {
    address: "0xB433adA68B8A8EE6B18753Fe4D98Bd1C7017C589",
    abi: IdDb.abi,
}

const GetDomain = () => {
    const navigate = useNavigate();
    const [isTrying, setIsTrying] = useState(false);
    const [domainName, setDomainName] = useState("");
    const [domainOwnerAddress, setDomainOwnerAddress] = useState("");
    const debouncedDomainName = useDebounce(domainName);
    const { saveEthName } = useEthNameContext();
    const { address: walletAddress } = useAccount();
    const { data: domainOwner, error: domainFetchError, isLoading: domainFetchIsLoading } = useContractRead({
        ...ContractDetails,
        functionName: "domains",
        args: [debouncedDomainName],
    })
    useEffect(() => {
        if (domainOwner) {
            setDomainOwnerAddress(domainOwner);
        }
    }, [domainOwner]);
    
    return (
        <Row className="text-center">
            <Col sm="12">
                <h4>If you already have a registered domain name asscociated with
                    your account please enter it or register a new domain on our contract.</h4>
            </Col>
            <Col sm="12" className="m-4">
                <Button onClick={()=>navigate("/verify/register/")}>Register Eth Name Instead</Button>
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
                            disabled={domainFetchError}
                            value={domainName}
                            placeholder="Enter your domain name"
                        />
                    </FloatingLabel>
                    <Button className="m-3" onClick={async () => {
                        setIsTrying(true);
                        try {
                            if (walletAddress === domainOwnerAddress) {
                                saveEthName(debouncedDomainName)
                                toast.success(`Your ENS is verified!`);
                                navigate("/verify/id/")
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
                    disabled={isTrying || domainFetchIsLoading}>Use this</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default GetDomain;