import React, { useState, useEffect, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import { Container, Grid, Paper, Typography, CircularProgress, Box, TextField, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/home.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { budget } = useContext(BudgetContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expense/all/${user.id}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const categories = expenses.map((expense) => expense.category);
  const amounts = expenses.map((expense) => expense.amount);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by Category',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  
  return (
    <div className={styles.dbody}>
      <Container maxWidth="lg" sx={{ marginTop: 6 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ padding: 3, margin: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Set Your Budget</Typography>
                
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Current Budget: ₹{budget}
                </Typography>
              </Paper>
              <Paper sx={{ padding: 3, margin: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Total Expenses</Typography>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                  ₹{totalExpenses}
                </Typography>
              </Paper>
              <Paper sx={{ padding: 3, margin: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Balance Remaining</Typography>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                  ₹{budget - totalExpenses}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Savings Goal</Typography>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                  ₹5000
                </Typography>
                <Box sx={{ marginTop: 2, width: '100%' }}>
                  <CircularProgress variant="determinate" value={30} size={100} />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    30% of Goal Achieved
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Expense Breakdown
                </Typography>
                <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
