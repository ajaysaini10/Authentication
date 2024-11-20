import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';       // Import the Auth component
import Register from './components/Register'; // Import the Register component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Auth />} />

        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />

        {/* Redirect the root ("/") to the login page */}
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;