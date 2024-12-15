// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/Auth"); 
const budgetRoutes = require("./routes/Budget");
const goalRoutes = require("./routes/Goal");
const connectDB = require("./config/db");  
const ExpenseRoutes=require("./routes/Expense");
dotenv.config();  

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

connectDB(); 
app.use("/api/auth", userRoutes); 
app.use("/api/budget", budgetRoutes);
app.use("/api/expense",ExpenseRoutes)
app.use("/api/goal", goalRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
