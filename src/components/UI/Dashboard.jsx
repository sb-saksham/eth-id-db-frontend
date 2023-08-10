import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ToastContainer } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import CenteredButton from './CenteredButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Dashboard() {
  const account = useAccount();
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();
  return (
    <Container fluid={true} className="p-4 text-center align-self-center" >
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand><NavLink to="/" style={{textDecoration:"none", color:"black"}}>Ethereum Id_db</NavLink></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <NavLink style={{textDecoration:"none"}} to="/start/registration/">Start Registration</NavLink>
            </Nav>
            <Navbar.Text>
              { user ? <> Signed in as: {user.full_name} <Button variant="warning" className='mx-2' onClick={signOut}>Sign Out</Button></> : <p>Not logged in!</p>}
            </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
      {account.address !== undefined ? <CenteredButton><ConnectButton /></CenteredButton> : null}
      <ToastContainer />
        <Outlet/>  
    </Container>
  );
}

export default Dashboard;