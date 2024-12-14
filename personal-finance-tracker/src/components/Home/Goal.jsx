import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import styles from '../../styles/home.module.css';
const MyGoal = () => {
  // Sample goals data
  const [goals, setGoals] = useState([
    { id: 1, name: 'Travel Fund', goalAmount: 5000, savedAmount: 1500 },
    { id: 2, name: 'Emergency Fund', goalAmount: 10000, savedAmount: 3500 },
    { id: 3, name: 'New Laptop', goalAmount: 80000, savedAmount: 25000 },
  ]);

  const handleViewGoalDetails = (goal) => {
    // You can redirect to another page or show a modal with detailed information
    alert(`Viewing details for goal: ${goal.name}`);
  };

  return (
    <div className={styles.dbody}>
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      
      <Grid container spacing={4}>
        {goals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5">{goal.name}</Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Goal Amount: ₹{goal.goalAmount}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Saved Amount: ₹{goal.savedAmount}
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
    </Container></div>
  );
};

export default MyGoal;
