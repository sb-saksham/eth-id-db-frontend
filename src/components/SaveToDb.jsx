import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { useEthNameContext } from '../context/EthNameContext';
import { useAuthContext } from '../context/AuthContext';

const SaveToDb = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { address: walletAddress } = useAccount();
    const { ethName } = useEthNameContext();
    const { user } = useAuthContext();
    console.log(ethName);
    useEffect(() => {
        if (ethName === null) {
            toast.error("Please first fetch your ETH name or register a new ETH Name");
            navigate('/verify/get/')
        }
     }, [ethName]);
    return (
        <Row className='text-center'>
            <Col sm="12">
                <Button variant="success" disabled={loading} onClick={async () => {
                    setLoading(true);
                    if (ethName === "" || ethName === undefined) {
                        navigate('/verify/get/');
                        toast.error("Please first fetch your ETH name or register a new ETH Name");
                    }
                    try {
                        const res = await axios.post(
                            "http://127.0.0.1:8000/accounts/save/to/db/",
                            {
                                ens: ethName,
                                address: walletAddress,
                            },
                            {
                                headers: {
                                    Authorization: `Token ${user.token}`
                                }
                            }
                        );
                        const dt = await res.data;    
                        toast.success("Successfully Verified!")
                        navigate("/");
                    } catch (er) {
                        toast.error(er.response.data.user || er.response.data.message);
                        navigate("/verify/id/");
                    }
                    setLoading(false);
                }}>Save To DB</Button>
            </Col>
        </Row>
    );
 };

export default SaveToDb;