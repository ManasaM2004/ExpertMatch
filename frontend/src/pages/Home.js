import { Link } from 'react-router-dom';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: "url('/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    position: 'relative',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5', // adjust the 0.5 to make it darker or lighter
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white', // ensures text is readable
    textAlign: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <h1>Welcome to ExpertMatch 👩‍🏫</h1>
        <p className="lead">Automated External Examiner Allocation System</p>
        <Link to="/admin" className="btn btn-primary mt-3">Go to Admin Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;