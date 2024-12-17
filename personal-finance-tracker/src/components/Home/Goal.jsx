import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/home.module.css";
import NoData from "../../images/NoData.png";
import { useAuth } from "../../context/AuthContext";

const MyGoal = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:5000/api/goal/email/${user.email}`);
          setGoals(response.data);
          console.log(response.data);
          console.log("goals fetched");
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

  const handleEditGoal = (goal) => {
    setSelectedGoal({ ...goal, remaining: goal.amount - goal.saved });
  };

  const openReward = () => {
    navigate('/Reward');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedGoal((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
      remaining: name === "amount" ? parseFloat(value) - prev.saved : prev.amount - parseFloat(value),
    }));
  };

  const handleSaveChanges = async () => {
    const { amount, saved, remaining } = selectedGoal;
    if (saved > amount) {
      alert("Saved amount cannot be greater than the total goal amount.");
      return;
    }

    if (saved > amount - remaining) {
      alert("Saved amount cannot exceed the remaining amount.");
      return;
    }

    try {
      const { _id } = selectedGoal;
      const response = await axios.put(`http://localhost:5000/api/goal/${_id}`, { amount, saved });
      alert(response.data.message || "Goal updated successfully!");

      if (saved >= amount) {
        setShowCongrats(true);
      }
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === _id ? { ...goal, amount, saved } : goal))
      );
      setSelectedGoal(null);
    } catch (error) {
      console.error("Error updating goal:", error.response?.data || error.message);
      alert("Failed to update the goal.");
    }
  };

  const handleDeleteGoal = async (goalId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/goal/${goalId}`);
      alert(response.data.message || "Goal deleted successfully!");
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error.response?.data || error.message);
      alert("Failed to delete the goal.");
    }
  };

  const closeCongratsModal = () => setShowCongrats(false);

  // Categorize goals into accomplished and not accomplished
  const accomplishedGoals = goals.filter((goal) => goal.saved >= goal.amount);
  const notAccomplishedGoals = goals.filter((goal) => goal.saved < goal.amount);

  return (
    <div className={styles.dbody}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
            <Typography variant="h6">Loading...</Typography>
          </Box>
        ) : error ? (
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginTop: 4 }}>
            <img src={NoData} alt="Error" style={{ maxWidth: "200px", marginBottom: "20px" }} />
            <Typography variant="h6">{error}</Typography>
          </Box>
        ) : selectedGoal ? (
          <Paper
            sx={{
              padding: 3,
              margin: "20px auto",
              maxWidth: 600,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Edit Goal: {selectedGoal.name}
            </Typography>
            <TextField
              fullWidth
              label="Goal Amount"
              type="number"
              name="amount"
              value={selectedGoal.amount}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Saved Amount"
              type="number"
              name="saved"
              value={selectedGoal.saved}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <Typography variant="body1" sx={{ color: "gray", marginBottom: 2 }}>
              Remaining Amount: ₹{selectedGoal.remaining.toFixed(2)}
            </Typography>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button variant="outlined" color="secondary" onClick={() => setSelectedGoal(null)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Box>
          </Paper>
        ) : (
          <>
            {/* Accomplished Goals Section */}
            {accomplishedGoals.length > 0 && (
              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" sx={{fontWeight: "bold",fontSize:"30px",fontFamily:"times new roman", marginBottom: 2 }}>
                <center>Accomplished Goals</center>
                </Typography>
                <Grid container spacing={4}>
                  {accomplishedGoals.map((goal) => (
                    <Grid item xs={12} sm={6} md={4} key={goal._id}>
                      <Paper
                        sx={{
                          padding: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <IconButton
                          sx={{ position: "absolute", top: 8, right: 8 }}
                          onClick={() => handleDeleteGoal(goal._id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                          {goal.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray", marginBottom: 1 }}>
                          Target Amount: ₹{goal.amount}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "green" }}>
                          Saved: ₹{goal.saved}
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditGoal(goal)}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Not Accomplished Goals Section */}
            {notAccomplishedGoals.length > 0 && (
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold",fontSize:"30px",fontFamily:"times new roman", marginBottom: 2 }}>
                  <center>Not Accomplished Goals</center>
                </Typography>
                <Grid container spacing={4}>
                  {notAccomplishedGoals.map((goal) => (
                    <Grid item xs={12} sm={6} md={4} key={goal._id}>
                      <Paper
                        sx={{
                          padding: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <IconButton
                          sx={{ position: "absolute", top: 8, right: 8 }}
                          onClick={() => handleDeleteGoal(goal._id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                          {goal.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray", marginBottom: 1 }}>
                          Target Amount: ₹{goal.amount}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "green" }}>
                          Saved: ₹{goal.saved}
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditGoal(goal)}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}

        {/* Congratulations Modal */}
        <Modal
          open={showCongrats}
          onClose={closeCongratsModal}
          aria-labelledby="congrats-title"
          aria-describedby="congrats-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography id="congrats-title" variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
              🎉 Congratulations! 🎉
            </Typography>
            <Typography id="congrats-description" variant="body1" sx={{ marginBottom: 3 }}>
              You've achieved your goal!🏆 Keep up the great work! Navigate to your Rewards section to claim your rewards!
            </Typography>
            <Button variant="contained" color="primary" padding='2' onClick={closeCongratsModal}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={openReward}>
              View
            </Button>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default MyGoal;
