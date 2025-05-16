import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '220px' }}>
      <div className="d-flex align-items-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Ramaiah_Institute_of_Technology_Logo.png/200px-Ramaiah_Institute_of_Technology_Logo.png"
          alt="MSRIT Logo"
          style={{ width: '40px', marginRight: '10px' }}
        />
        <h5 className="mb-0">ExpertMatch</h5>
      </div>
      <p className="text-muted">🏫 Ramaiah College<br />Dept: CSE</p>
      <hr />
      <Link to="/dashboard" className="text-white d-block mb-2">Dashboard</Link>
      <Link to="/about" className="text-white d-block mb-2">About</Link>
      <Link to="/contact" className="text-white d-block mb-2">Contact</Link>
      <Link to="/feedback" className="text-white d-block">Feedback</Link>
    </div>
  );
};

export default Sidebar;
