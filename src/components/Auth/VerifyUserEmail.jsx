import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Container from "react-bootstrap/esm/Container";

import Spinner from '../UI/Spinner/Spinner'; 

const VerifyUserEmail = () => {
    
    const { verifyKey } = useParams;
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => { 
        const res = axios.get("127.0.0.1:8000")
    }, []);

    return (
        <Container fluid>
            {loading ? <Spinner /> : <>
                {
                    verified ?
                        <h3>You've been successfully verified!</h3>
                        : <Container>
                            <h3>Some Error Occurred! Try Sending Activation Email Again</h3>
                        </Container>
                }
            </>}
        </Container>
    );
}

export default VerifyUserEmail;