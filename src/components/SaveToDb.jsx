import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { toast } from 'react-toastify';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const ContractDetails = {
    address: "0xcF380F806F1C66cdd99f96582f05cd2f4687005a",
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"InvalidName","type":"error"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"domains","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"infodb","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"domainName","type":"string"}],"name":"isOwnerOf","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"registerDomain","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"valid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"verifiedAddresses","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"verifiedDomains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"dname","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"verify","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
}

const SaveToDb = () => {
    const navigate = useNavigate();
    const {
        data: saveIdData,
        isLoading: saveIdIsLoading,
        error: saveIdError,
        isSuccess: saveIdIsSuccess,
        writeAsync: saveIdWrite,
    } = useContractWrite({
        ...ContractDetails,
        functionName:"saveIdToDb",
    })
    return (
        <Row className='text-center'>
            <Col sm="12">
                <Button variant="success" onClick={async () => {
                    try {
                        const res = await axios.get("/rest/user/verified/");
                        const dt = await res.data;
                        if (!dt.verified) {
                            toast.error("You are not verified! Please Verify yourself first!");
                            navigate("/verify/id/");
                        }
                        if (dt.verified) {
                            await saveIdWrite?.({
                                args: [dt.name, dt.ethName]
                            })
                            if (saveIdIsSuccess) {
                                toast.success("Successfully added your name  adn wallet address to ID Database!")
                            }
                        }
                    } catch (er) {
                        toast.error("An unexpected error occurred. Please try again later!");
                    }
                }}>Save To DB</Button>
            </Col>
        </Row>
    );
 };

export default SaveToDb;