import React, { useState, useEffect } from "react";
import coupen1 from "../../images/coupen1.png";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/home.module.css";
import { useAuth } from "../../context/AuthContext";

const MyGoal = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:5000/api/goal/email/${user.email}`);
          setGoals(response.data);
        } catch (error) {
          console.error("Error fetching goals:", error.response?.data || error.message);
          setError("Could not fetch goals");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGoals();
  }, [user]);

  return (
    <div className={styles.dbody}>
      <Container>
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <>
            {/* Accomplished Goals Section */}
            {goals.length > 0 ? (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "30px", fontFamily: "times new roman", marginBottom: 2 }}>
                  <center>Accomplished Goals</center>
                </Typography>
                <Grid container spacing={4}>
                  {goals.map((goal) => (
                    <Grid item xs={12} sm={6} md={4} key={goal._id}>
                      <Paper
                        sx={{
                          padding: 0,

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        
                        {/* Simple "Hello" heading */}
                        <img src={coupen1} alt="coupen" style={{ maxWidth: '350px', marginBottom: '20px' }} />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h6" color="textSecondary">No Accomplished Goals</Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyGoal;