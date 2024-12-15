import React, { useState, useEffect, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import { Container, Grid, Card, Typography, CircularProgress, Box, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/home.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const { budget } = useContext(BudgetContext);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [categoryPercentages, setCategoryPercentages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/budget/fetch/${user.id}`);
        setExpenses(response.data);
        setTotalAmount(response.data.totalAmount);
        setCurrentAmount(response.data.currentAmount);
      const response1 = await axios.get(`http://localhost:5000/api/expense/category-percentage/${user.id}`);
      console.log("response1")
      console.log(response1)
      setCategoryPercentages(response1.data.categoryPercentages);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  const data = {
    labels: categoryPercentages.map((item) => item.category), // Category names
    datasets: [
      {
        data: categoryPercentages.map((item) => item.percentage), // Category amounts
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.dbody}>
      <Container maxWidth="lg" sx={{ marginTop: 6 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {/* Row for Budget, Total Expenses, and Balance Remaining */}
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2} justifyContent="center">
                {/* Current Budget Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '200px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Your Current Budget</Typography>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }}>₹{totalAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Total Expenses Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '200px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Total Expenses</Typography>
                    <CardContent>
                      <Typography variant="h4" sx={{ color: 'red', fontWeight: 'bold' }}>₹{totalAmount - currentAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Balance Remaining Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '200px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Balance Remaining</Typography>
                    <CardContent>
                      <Typography variant="h4" sx={{ color: 'blue', fontWeight: 'bold' }}>₹{currentAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Row for Savings Goal and Expense Breakdown (Graphs) */}
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2} justifyContent="center">
                {/* Savings Goal Card */}
                <Grid item xs={12} sm={6} md={8}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '250px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Expense Breakdown</Typography>
                    <CardContent>
                      <Pie data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Expense Breakdown Card */}
                {/* <Grid item xs={12} sm={6} md={8}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '250px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Expense Breakdown</Typography>
                    <CardContent>
                      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </CardContent>
                  </Card>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
