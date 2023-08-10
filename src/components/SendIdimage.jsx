import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuthContext } from "../context/AuthContext";


const SendIdImage = () => {
    const { user } = useAuthContext();
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(null);
    const [localIdImg, setLocalIdImg] = useLocalStorage("id_image", null);
    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);
    const retake = () => {
        setImgSrc(null);
    };
    const submitPicture = async () => {
        console.log(user.token)
        try {
            const res = await axios.post("http://127.0.0.1:8000/accounts/id/img/", {
                "id_image": imgSrc
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${user.token}`
                }
            });
            const dt = await res.data;
            setLocalIdImg(dt.id_image);
            navigate('/verify/register')
        } catch (er) {
            toast.error(er.response.data.id_image);
            retake();
            return er;
        }
    }
    return (
        <div className="container text-center">
            <h4>Upload Identification Card Image in which your face is clearly visible and it mentions your Name <br/>that you mentioned while signing up.</h4>
            {localIdImg ?
                <><img src={localIdImg} alt="Previously Stored Image" />
                <h3>Previously stored Image</h3></>
            : null}
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam height={600} width={600} ref={webcamRef} />
            )}
            <div className="btn-container my-5 text-center">
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
export default SendIdImage;