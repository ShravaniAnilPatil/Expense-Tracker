import React, { useState, useEffect, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import { Container, Grid, Card, Typography, CircularProgress, Box, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Pie,Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement  } from 'chart.js';
import styles from '../../styles/home.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import NoData from '../../images/NoData.png';
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

const Dashboard = () => {
  const { budget } = useContext(BudgetContext);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [categoryPercentages, setCategoryPercentages] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [lineDataa, setLineData] = useState({});
  useEffect(() => {
    console.log("dailyExpenses updated:", dailyExpenses);
  }, [dailyExpenses]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/budget/fetch/${user.id}`);
        setExpenses(response.data);
        setTotalAmount(response.data.totalAmount);
        setCurrentAmount(response.data.currentAmount);
        const date = new Date(response.data.startdate);

// To get the date in YYYY-MM-DD format:
const startformattedDate = date.toISOString().split('T')[0];
const enddate = new Date(response.data.enddate);

// To get the date in YYYY-MM-DD format:
const endformattedDate = enddate.toISOString().split('T')[0];
        setenddate(endformattedDate)
        setstartdate(startformattedDate)
      const response1 = await axios.get(`http://localhost:5000/api/expense/category-percentage/${user.id}`);
      console.log("response1")
      console.log(response1)
      setCategoryPercentages(response1.data.categoryPercentages);
      const response2 = await axios.get(`http://localhost:5000/api/expense/daily-expenses/${user.id}`)
      console.log("response2")
      console.log(response2)
      setDailyExpenses(response2.data.dailyExpenses);
      console.log("daily")
      console.log(dailyExpenses)
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);
  useEffect(() => {
    const newLineData = {
      labels: dailyExpenses.map((item) => item._id), // Extract dates
      datasets: [
        {
          label: 'Daily Expenses',
          data: dailyExpenses.map((item) => item.totalAmount), // Extract expense totals
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };
    setLineData(newLineData);
  }, [dailyExpenses]);
  
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
  console.log("check")
  console.log(lineDataa)
  // const lineData = {
  //   labels: dailyExpenses.map((item) => item._id.date), // Extract dates
  //   datasets: [
  //     {
  //       label: 'Daily Expenses',
  //       data: dailyExpenses.map((item) => item.totalExpenses), // Extract expense totals
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  // };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Expenses Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expense Amount (₹)',
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className={styles.dbody}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <div className="dated" style={{display:"flex",justifyContent:"space-between"}}>
        <h5> Start date: {startdate}</h5>
        <h5>End date: {enddate}</h5>
        </div>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <img src={NoData} alt="Error" style={{ maxWidth: "200px", marginBottom: "20px" }} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {/* Row for Budget, Total Expenses, and Balance Remaining */}
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2} justifyContent="center">
                {/* Current Budget Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '50px' }}>
                    <Typography  variant="h5" >Your Current Budget</Typography>
                    <CardContent>
                      <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>₹{totalAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Total Expenses Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '50px' }}>
                    <Typography variant="h5" >Total Expenses</Typography>
                    <CardContent>
                      <Typography variant="h4" sx={{ color: 'red', fontWeight: 'bold' }}>₹{totalAmount - currentAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Balance Remaining Card */}
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '50px' }}>
                    <Typography variant="h5" >Balance Remaining</Typography>
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
                <Grid item xs={12} sm={3} md={4}>
                  <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '250px' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Expense Breakdown</Typography>
                    <CardContent>
                      <Pie data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
  <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', minHeight: '400px' }} >
    <Typography variant="h5" sx={{ marginBottom: 0.1 }}>Daily Expenses Over Time</Typography>
    <CardContent>
      <Line data={lineDataa} options={lineOptions} height={330} width={400} /> {/* You can adjust the height here as well */}
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
