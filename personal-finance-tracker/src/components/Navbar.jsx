import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/home.module.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navbody}>
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
          <Button variant="secondary">Sign-out</Button>
          <div className={styles.profile}>
          <EmailRoundedIcon />
          </div>
          <div className={styles.profile}>
          <PersonIcon /></div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;