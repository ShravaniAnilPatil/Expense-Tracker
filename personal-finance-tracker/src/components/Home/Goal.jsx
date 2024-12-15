import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import axios from 'axios'; 
import styles from '../../styles/home.module.css';

const MyGoal = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const userId = '675dbf275699be0759b241ab'; 

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/goal/users/${userId}/goals`); 
        setGoals(response.data);
      } catch (err) {
        setError('Failed to load goals.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [userId]); 

  const handleViewGoalDetails = (goal) => {
    alert(`Viewing details for goal: ${goal.name}`);
  };

  return (
    <div className={styles.dbody}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {loading ? (
          <Typography variant="h6" align="center">Loading goals...</Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {goals.map((goal) => (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h5">{goal.name}</Typography>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Goal Amount: ₹{goal.amount}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Saved Amount: ₹{goal.saved}
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewGoalDetails(goal)}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default MyGoal;
