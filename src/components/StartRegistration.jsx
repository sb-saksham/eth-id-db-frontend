import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const StartRegistration = () => {
  const navigate = useNavigate();
  return (
    <Row className='text-center my-5' >
        <Col sm="4"></Col>
        <Col sm="4">
            <h3>1. Start by resolving your ETH Name associated with your wallet address. This will be used to verify your wallet address</h3>
            <Button variant="success" onClick={() => { navigate('/verify/register/') }}>Register ETH Name</Button>{'     '}
            <Button variant="success" onClick={() => { navigate('/verify/get/') }}>Get ETH Name</Button>
        </Col>
        <Col sm="4"></Col>
    </Row>
  );
};

export default StartRegistration;