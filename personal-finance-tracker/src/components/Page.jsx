import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/home.module.css';

import { Link, useNavigate } from "react-router-dom"; 

import Home2 from "../images/Home2.png";
import Home3 from "../images/Home3.png";
import Home4 from "../images/Home4.png";
import Home5 from "../images/Home5.png";
import Home6 from "../images/Home6.png";
function Page() { 
    return (
      <div>
        <Navbar expand="lg" className={styles.navbody}>
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
                    <Link to="/login"><button id="loginbutton" className="btn">
                        SignIn
                    </button></Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        
            <img src={Home2} alt="BudgetBuddy" className={styles.imagefullscreen} />
            <img src={Home3} alt="BudgetBuddy" className={styles.imagefullscreen} />
            <img src={Home4} alt="BudgetBuddy" className={styles.imagefullscreen} />
            <img src={Home5} alt="BudgetBuddy" className={styles.imagefullscreen} />
            <img src={Home6} alt="BudgetBuddy" className={styles.imagefullscreen} />
        
      </div>
    );
}

export default Page;
