import './App.css';
import UserSignUp from './components/Auth/sign-up';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/login';
import AddForm from './components/Home/AddForm';
import CheckExpense from './components/Home/CheckExpense';
import Dashboard from './components/Home/Dashboard';
import NewGoal from './components/Home/NewGoal';
import Home from './components/Home/Home';
import Notifications from './components/Home/Notifications';
import Profile from './components/Home/Profile';
import NavBar from './components/Navbar';
import Page from './components/Page';
import BudgetForm from './components/Home/setBudget';
function App() {
  return (
   
    <div>
     <NavBar />
      <Router>
        <Routes>
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addform" element={<AddForm />} />
          <Route path="/checkexpense" element={<CheckExpense />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/NewGoal" element={<NewGoal />} />
          <Route path="/" element={<Home />} />
          <Route path="/notify" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/page" element={<Page />} />
          <Route path="/navbar" element={<NavBar/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
