import Webcam from "react-webcam";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useAccount, useContractRead } from "wagmi";

import IdDb from "../artifacts/contracts/idDb.sol/IdDb.json";

const ContractDetails = {
    address: "0xB433adA68B8A8EE6B18753Fe4D98Bd1C7017C589",
    abi: IdDb.abi,
}

const SendWAddrImage = () => {
    const { user } = useAuthContext();
    const { address: walletAddress } = useAccount();
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(null);
    const [localWalletImg, setLocalWalletImg] = useLocalStorage("wallet_image", null);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);
    const retake = () => {
        setImgSrc(null);
    };
    const submitPicture = async () => {
        if (ethName === "" || ethName === undefined) {
            navigate('/verify/register/');
            toast.error("No ETH Name registered with this Wallet Address! Please register a ETH Name with this Wallet Address!");
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
            setLocalWalletImg(dt.waddr_image);
            navigate('/')
            toast.success("ETH Name and Face verified!");
        } catch (er) {
            toast.error(er.response.data.message);
            retake();
            return er;
        }
    }
    return (
        <div className="container text-center">
            <p className="justify-content-left"><h4>Instructions:</h4> <br />
            For address Image hold your Ethereum Name stored in Smart Contract 
            in your hands,<br/>
            with both clearly visible, your face and the Name written or printed in piece of paper.<br />
            The address should be written clearly (preferably using a marker)<br />
            Keep some space between letters for better understanding.
            </p>        
            <Form.Control disabled value={ethName} placeholder="qwertyxyz.tld" aria-label="ETH Name"
          aria-describedby="ETH name of Wallet holder"
            />
            {localWalletImg ?
                <><img src={localWalletImg} alt="Previously Stored Image" />
                <h3>Previously stored Wallet Address Image</h3></>
            : null}
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam height={600} width={600} ref={webcamRef} />
            )}
            <div className="btn-container my-5">
                {imgSrc ? (
                    <>
                        <Button variant="primary" onClick={retake}>Retake photo</Button>
                        {'      '}
                        <Button variant="success" onClick={submitPicture}>Submit Photo</Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={capture}>Capture photo</Button>
                )}

            </div>
        </div>
    );
};
export default SendWAddrImage;