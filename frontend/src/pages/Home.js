import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to ExpertMatch 👩‍🏫</h1>
      <p className="lead">Automated External Examiner Allocation System</p>
      <Link to="/admin" className="btn btn-primary mt-3">Go to Admin Dashboard</Link>
    </div>
  );
};

export default Home;
