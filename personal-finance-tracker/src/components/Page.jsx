import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/home.module.css';

import { Link, useNavigate } from "react-router-dom"; 

import Home from "../images/Home.png";


function Page() { 
    
    return (
      <div>

      
        <Navbar expand="lg" className={styles.navbody}>
            <Container fluid>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    />
                    <Link to="/login"><button id="loginbutton"className="btn">
                        SignIn
                    </button></Link>
                    
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <img src={Home} alt="BudgetBuddy"
        class={styles.imagefullscreen} />
        </div>
    );
}
export default Page; 