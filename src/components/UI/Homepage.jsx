import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Userworkflow from "../../assets/Userworkflow.jpg";
import Companyworkflow from "../../assets/Companyworkflow.jpg";
import { useAuthContext } from '../../context/AuthContext';


function HomePage() {
    const navigate = useNavigate();
    const { user, signOut } = useAuthContext();
  return (  
    <Container fluid className='mt-4 p-1'>
      <h3>Welcome to Ethereum Identity Database</h3>  
      <h3>Biggest Database of Verified users on Ethereum Blockchain.</h3>
      <hr/>
      <h3>For Users</h3>
      <h4>Get Yourself Verified so that applications using our database could recognize you!</h4>
      <h3>For Companies</h3>
      <h4>Use our Database to allow only verified user to onboard on your Ethereum Application</h4>
      <br />
      <h3><strong>Working (User WorkfLow)</strong></h3>
    <Card>
      <Card.Img variant="top" src={Userworkflow} />
      </Card>
      <Row>
        <Col sm="12" className='text-center p-3 m-5'> 
          <Col className='mb-3'>
            Register Yourself Now!
          </Col>
          <Col>
            <Button onClick={() => { navigate('/start/registration/') }}>Start Registration</Button>
          </Col>
        </Col>
      </Row>
      <br />
      <h3><strong>Working (Company WorkfLow)</strong></h3>
    <Card>
      <Card.Img variant="top" src={Companyworkflow} />
      </Card>
    </Container>
  );
}

export default HomePage;