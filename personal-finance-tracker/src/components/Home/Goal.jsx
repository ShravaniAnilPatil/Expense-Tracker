import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import styles from '../../styles/home.module.css';
import NoData from '../../images/NoData.png';

const MyGoal = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userId = '675dbf275699be0759b241ab';

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/goal/users/${userId}/goals`);
        setGoals(response.data);
      } catch (err) {
        setError(true);
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
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
            
          </Box>
        ) : error ? (
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginTop: 4 }}>
            <img src={NoData} alt="Error" style={{ maxWidth: '200px', marginBottom: '20px' }} />
            
          </Box>
        ) : (
          <Grid container spacing={4}>
            {goals.map((goal) => (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <Paper
                  sx={{
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {goal.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'gray', marginBottom: 1 }}>
                    Target Amount: ₹{goal.amount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'green' }}>
                    Saved: ₹{goal.saved}
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewGoalDetails(goal)}
                      sx={{ textTransform: 'none', fontWeight: 'bold' }}
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
