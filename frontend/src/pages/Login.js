import { useState } from 'react';
import externalProfessors from '../data/externalProfessors.json';
import internalProfessors from '../data/internalProfessors.json';
import labs from '../data/labs.json';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'expertmatch123') {
      localStorage.setItem('isLoggedIn', 'true');
      setLoggedIn(true);
    } else {
      alert('❌ Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (loggedIn) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🔍 Labs and Professors Overview</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>

        {/* 🔹 Labs Section */}
        <h4 className="text-primary">📚 Scheduled Labs</h4>
        <div className="table-responsive mb-5">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Session</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab, index) => (
                <tr key={lab.id ||`${lab.subject}-${lab.date}-${lab.session}`}>
                  <td>{index + 1}</td>
                  <td>{lab.subject}</td>
                  <td>{lab.date}</td>
                  <td>{lab.session}</td>
                  <td>
                    {lab.status === 'Assigned' ? (
                      <span className="badge bg-success">Assigned</span>
                    ) : (
                      <span className="badge bg-secondary">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔹 External Professors */}
        <h4 className="text-primary">👩‍🏫 External Professor Profiles</h4>
        <div className="row">
          {externalProfessors.map((prof) => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5>{prof.name}</h5>
                  <p><strong>College:</strong> {prof.college}</p>
                  <p><strong>Email:</strong> {prof.email}</p>
                  <p><strong>Phone:</strong> {prof.phone}</p>
                  <p><strong>Specialization:</strong> {prof.specialization.join(', ')}</p>
                  <p>
                    <strong>Available:</strong>{' '}
                    {Array.isArray(prof.availability)
                      ? prof.availability.map(a =>`${a.date} (${a.session})`).join(',')
                      : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Internal Professors */}
        <h4 className="text-primary mt-5">🏫 Internal Professor Profiles</h4>
        <div className="row">
          {internalProfessors.map((prof) => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5>{prof.name}</h5>
                  <p><strong>College:</strong> {prof.college}</p>
                  <p><strong>Email:</strong> {prof.email}</p>
                  <p><strong>Phone:</strong> {prof.phone}</p>
                  <p><strong>Specialization:</strong> {prof.specialization.join(', ')}</p>
                  <p>
                    <strong>Available:</strong>{' '}
                    {Array.isArray(prof.availability)
                      ? prof.availability.map(a => `${a.date} (${a.session})`).join(',')
                      : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 👇 Login Form
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">🔐 Admin Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;