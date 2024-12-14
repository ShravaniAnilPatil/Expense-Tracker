// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/Auth"); 
const connectDB = require("./config/db");  
const BudgetRoutes=require("./routes/Budget")
const ExpenseRoutes=require("./routes/Expense")
dotenv.config();  

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

connectDB(); 
app.use("/api/auth", userRoutes); 
app.use("/api/budget",BudgetRoutes);
app.use("/api/expense",ExpenseRoutes)
app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
