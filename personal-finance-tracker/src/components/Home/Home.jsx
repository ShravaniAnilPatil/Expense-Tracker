import React from 'react'
import NavBar from '../Navbar'
import Dashboard from './Dashboard'
import { color } from 'chart.js/helpers'
import styles from '../../styles/home.module.css'
import MyGoal from './Goal'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/addform');
  };

  return (
    <div className={styles.main}>
        
        <div>
          <h1 align="center" className={styles.wel}>Welcome username</h1>
          </div>
        <div className={styles.cardcontainer}>
            <div className={styles.card}>
              <h3>Set a Budget</h3>
              
              <button>Get Started</button>
            </div>
            <div className={styles.card}>
              <h3>Track Custom Expense</h3>
              
              <button>Get Started</button>
            </div>
        </div>

        
        <p className={styles.hname}>Dashboard</p>
        <Dashboard />
        <div className={styles.btnmain}>
          <button className={styles.btn} onClick={handleSubmit}>
            {/* <div className={styles.circle}> <AddCircleOutlineRoundedIcon /></div> */}
            <h6>Add an Expense</h6>
            
            </button>
        </div>
        <p className={styles.hname}>MyGoals</p>
        <MyGoal />
        <div className={styles.btnmain}>
          <button className={styles.btn}>
            {/* <div className={styles.circle}> <AddCircleOutlineRoundedIcon /></div> */}
            <h6>Add a New Goal</h6>
            
            </button>
        </div>
    </div>
  )
}

export default Home
