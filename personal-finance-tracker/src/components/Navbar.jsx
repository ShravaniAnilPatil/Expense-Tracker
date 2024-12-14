import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/home.module.css';
import PersonIcon from '@mui/icons-material/Person';
function NavBar() {
  return (
    <Navbar expand="lg" className='navbody'>
      <Container fluid >
        <Navbar.Brand href="#">Personal-finance-tracker</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Button variant="outline-secondary">Sign-out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;