import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ToastContainer } from 'react-toastify';

import { useAuthContext } from '../../context/AuthContext';
import CenteredButton from './CenteredButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Dashboard() {
  const account = useAccount();
  const { user, signOut } = useAuthContext();
  return (
    <Container fluid={true} className="p-4 text-center align-self-center" >
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand href="#home">Ethereum Id_db</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
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