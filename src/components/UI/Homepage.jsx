import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import UserWorkflow

import { useAuthContext } from '../../context/AuthContext';

function HomePage() {
    const navigate = useNavigate();
    const { user, signOut } = useAuthContext();
  return (  
    <Container fluid>
    <Card>
      <Card.Img variant="top" src="assets/Userworkflow.jpg" />
      <Card.Body>
        <Card.Title>User Workflow</Card.Title>
      </Card.Body>
    </Card>
      <Button onClick={() => { navigate('/verify/register/') }}>Register ETH Name</Button>
      <Button onClick={() => { navigate('/verify/get/') }}>Get ETH Name</Button>
    </Container>
  );
}

export default HomePage;