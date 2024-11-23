import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import OTP from './pages/OTP';
import AddNew from './pages/addNew';
import History from './pages/History';
import Stat from './pages/Stat';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to='/signup'></Navigate>} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddNew />} />
          <Route path="/history" element={<History />} />
          <Route path="/stats" element={<Stat />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/otp" element={<OTP />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
