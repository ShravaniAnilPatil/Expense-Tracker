import './App.css';
import UserSignUp from './components/Auth/sign-up';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
