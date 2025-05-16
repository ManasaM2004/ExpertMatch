import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* 🔒 Protected Dashboard (after login only) */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* 🔒 Optional: Admin Dashboard */}
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
