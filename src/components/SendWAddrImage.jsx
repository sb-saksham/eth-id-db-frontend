import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEthNameContext } from "../context/EthNameContext";

const SendWAddrImage = () => {
    const { user } = useAuthContext();
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const { ethName } = useEthNameContext();
    useEffect(() => {
        if (ethName === null) {
            toast.error("Please first fetch your ETH name or register a new ETH Name");
            navigate('/verify/get/')
        }
     }, [ethName]);
    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);
    const retake = () => {
        setImgSrc(null);
    };
    const submitPicture = async () => {
        setLoading(true);
        if (ethName === "" || ethName === undefined) {
            navigate('/verify/get/');
            toast.error("Please first fetch your ETH name or register a new ETH Name");
        }
        try {
            const res = await axios.post("http://localhost:8000/accounts/waddr/img/", {
                "waddr_image": imgSrc,
                "eth_name": ethName,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${user.token}`
                }
            });
            const dt = await res.data;
            toast.success("ETH Name and Face verified!");
            navigate('/save/id/')
        } catch (er) {
            toast.error(er.response.data?.message || er.response.data);
            retake();
            return er;
        }
        setLoading(false);
    }
    return (
        <div className="container text-center">
            <h4>Instructions:</h4> <p className="justify-content-left">
            For address Image hold your Ethereum Name stored in Smart Contract 
            in your hands,<br/>
            with both clearly visible, your face and the Name written or printed in piece of paper.<br />
            The address should be written clearly (preferably using a marker)<br />
            Keep some space between letters for better understanding.
            </p>        
            <Form.Control disabled value={ethName} placeholder="qwertyxyz.tld" aria-label="ETH Name"
          aria-describedby="ETH name of Wallet holder"
            />
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam height={600} width={600} ref={webcamRef} onUserMediaError={(e) => {
                        toast.error("Please reload the page to allow the website to access the camera.")
                }}/>
            )}
            <div className="btn-container my-5">
                {imgSrc ? (
                    <>
                        <Button variant="primary" onClick={retake}>Retake photo</Button>
                        {'      '}
                        <Button variant="success" disabled={loading} onClick={submitPicture}>Submit Photo</Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={capture}>Capture photo</Button>
                )}

            </div>
        </div>
    );
};
export default SendWAddrImage;