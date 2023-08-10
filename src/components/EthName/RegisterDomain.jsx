import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead, useAccount } from "wagmi";
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import IdDb from "../../artifacts/contracts/idDb.sol/IdDb.json";
import useDebounce from '../../hooks/UseDebounce';

const ContractDetails = {
    address: "0xB433adA68B8A8EE6B18753Fe4D98Bd1C7017C589",
    abi: IdDb.abi,  
}
const getPrice = (lengt) => {
    if (lengt == 2) {
        return 5 * 10 ** 15;
    } else if (lengt == 3) {
        return 4 * 10 ** 15;
    } else if (lengt == 4) {
        return 3 * 10 ** 15;
    } else if (lengt == 5) {
        return 2 * 10 ** 15;
    } else {
        return 1 * 10 ** 15;
    }
}

const RegisterDomain = () => {
    const navigate = useNavigate();
    const { address: walletAddress } = useAccount();

    const [domainName, setDomainName] = useState("");
    const [priceOfDomain, setPriceOfDomain] = useState(0);
    const [transactionHash, setTransactionHash] = useState("");
    const [domainOfUser, setDomainOfUser] = useState("");
    const debouncedDomainName = useDebounce(domainName, 500);
    const debouncedDomainPrice = useDebounce(priceOfDomain, 500);

    const { data: transactionData, isSuccess: transactionIsSuccess, isLoading: transactionIsLoading } = useWaitForTransaction({ hash: transactionHash });
    const { config: registerDomainConfig, error: registerPrepareEr } = usePrepareContractWrite({
        ...ContractDetails,
        functionName: "registerDomain",
        value: debouncedDomainPrice,
        args: [debouncedDomainName],
    });
    const {
        data: registerData,
        isLoading: registerIsLoading,
        error: registerError,
        writeAsync: registerWrite,
        isSuccess: registerIsSuccess,
    } = useContractWrite(registerDomainConfig);

    const { data: domainOfUr, error: domainFetchError} = useContractRead({
        ...ContractDetails,
        functionName: "domainOf",
        args: [walletAddress],
    });
    useEffect(() => {
        if (domainOfUr) {
            setDomainOfUser(domainOfUr);
        }
     }, [domainOfUr]);
    console.log("register error", registerPrepareEr);
    console.log("regWrite", !registerWrite)
    console.log("regload", registerIsLoading)
    console.log("regError", registerError);
    console.log("trLoad", transactionIsLoading)
    return (
        <Row className="text-center">
            <Col sm="12">
                <h4>If you already have a registered domain name asscociated with
                    your account please enter it or register a new domain on our contract below.</h4>
            </Col>
            <Col sm="12">
                <h4>Current price: <strong>{debouncedDomainPrice}</strong></h4>
            </Col>
            <Col sm="12">
                <Form disabled={domainOfUser !== undefined || domainOfUser !== ""}>     
                {/* <Form.Control disabled>{domainFetchError?domainOfUser : null}</Form.Control> */}
                    <FloatingLabel
                        controlId="floating_domainName"
                        label="Enter Domain Name"
                    >
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => {
                                setDomainName(e.target.value);
                                setPriceOfDomain(getPrice(e.target.value.length));
                            }}
                            placeholder="Enter your domain name"
                            isValid={!registerPrepareEr}
                            isInvalid={registerPrepareEr}
                        />
                        <Form.Control.Feedback type="invalid">{registerPrepareEr?.message}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button onClick={async () => {
                        try {
                            const txHash = await registerWrite?.();
                            setTransactionHash(txHash);
                            if (registerIsSuccess && transactionIsSuccess) {
                                navigate("/verify/wallet")
                                toast.success(`Transaction successful check at <a href='https://sepolia.etherscan.io/tx/${txHash}'>Etherscan</a>`);
                            } else {
                                console.log(registerError);
                            }
                        } catch (error) {
                            console.error("From here", error);
                            setDomainName(debouncedDomainName);
                            console.log("regWrite", !registerWrite)
                            console.log("regload", registerIsLoading)
                            console.log("regError", registerError);
                            console.log("trLoad", transactionIsLoading)
                        }
                    }}
                    disabled={!registerWrite || registerIsLoading || registerError || transactionIsLoading}>Register</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default RegisterDomain;