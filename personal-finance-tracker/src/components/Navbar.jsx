import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/home.module.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import logo from '../images/logo1.png';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "./context/AuthContext"; 
import GradeIcon from '@mui/icons-material/Grade';


function CustomNavbar() { 
    const navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.removeItem('authToken');
    }
    // const { isLoggedIn, setIsLoggedIn } = useAuth(); 

    // const handleLogout = () => {
    //     if (window.confirm("Are you sure you want to logout?")) { 
    //         localStorage.removeItem("authToken");
    //         setIsLoggedIn(false);
    //         navigate("/login");
    //     }
    // };

    return (
        <Navbar expand="lg" className={styles.navbody}>
            <Container fluid>
                <img
                    src={logo}
                    alt="Logo"
                    width="120"
                    height="30"
                    className="d-inline-block align-text-top ms-3"
                />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    />
                    <Link to="/"><button id="loginbutton" onClick={handleLogout} className="btn">
                        LogOut
                    </button></Link>
                   
                    <div>
                        <Link to="/Reward" className={styles.profile}>
                            <GradeIcon/>
                        </Link>
                    </div>
                    <div>
                        <Link to="/profile" className={styles.profile}>
                            <PersonIcon />
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default CustomNavbar; 