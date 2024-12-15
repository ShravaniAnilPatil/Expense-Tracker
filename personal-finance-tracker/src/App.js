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
import { AuthProvider } from './components/context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <div>
      <Router>
        <AuthProvider> {/* Wrap entire app with AuthProvider */}
          <NavBar />
          <Routes>
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addform" element={<AddForm />} />
            <Route path="/api/expense/all/675dee04bbac4d995aab0502" element={<CheckExpense />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/NewGoal" element={<NewGoal />} />
            <Route path="/" element={<Home />} />
            <Route path="/notify" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/page" element={<Page />} />
            <Route path="/navbar" element={<NavBar />} />
            <Route path="/setBudget" element={<BudgetForm />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
