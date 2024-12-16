import './App.css';
import UserSignUp from './components/Auth/sign-up';
import { AuthProvider } from "../src/context/AuthContext";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import { BudgetProvider } from './context/BudgetContext';
import CustomExpense from './components/Home/CustomExpense';
import Reward from './components/Home/Reward';

function App() {
  return (
    <AuthProvider>
      <Router>
        <BudgetProvider>
          <Layout>
            <Routes>
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addform" element={<AddForm />} />
              <Route path="/api/expense/all/:id" element={<CheckExpense />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/NewGoal" element={<NewGoal />} />
              <Route path="/home" element={<Home />} />
              <Route path="/notify" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Page />} />
              <Route path="/setBudget" element={<BudgetForm />} />
              <Route path="/CustomExpense" element={<CustomExpense />} />
              <Route path="/Reward" element={<Reward />} />
            </Routes>
          </Layout>
        </BudgetProvider>
      </Router>
    </AuthProvider>
  );
}

// Create a Layout component to conditionally render the NavBar
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide NavBar on login and signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <NavBar />}
      {children}
    </>
  );
};

export default App;