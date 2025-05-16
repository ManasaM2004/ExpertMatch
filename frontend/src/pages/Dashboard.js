import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import labsData from '../data/labs.json';
import professorsData from '../data/professors.json';
import { sendLabAssignment } from '../utils/sendMail';

const Dashboard = () => {
  const [labs, setLabs] = useState(labsData);
  const [professors, setProfessors] = useState(professorsData);

  const manuallyAssignProfessor = (profId) => {
    const prof = professors.find(p => p.id === profId);
    const match = labs.find(
      l => l.status === 'Unassigned' &&
      prof.specialization.includes(l.subject) &&
      prof.availability.some(a => a.date === l.date && a.session === l.session)
    );

    if (match) {
      const updatedLabs = labs.map(l =>
        l.id === match.id ? { ...l, status: 'Assigned', assignedTo: prof.id } : l
      );
      setLabs(updatedLabs);

      sendLabAssignment(prof, match)
        .then(() => alert(`✅ ${prof.name} assigned to ${match.subject} lab. Email sent!`))
        .catch(() => alert('❌ Email failed.'));
    } else {
      alert('❌ No matching unassigned lab for this professor.');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h3>📅 Scheduled Labs</h3>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Session</th>
              <th>Status</th>
              <th>Professor</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab, idx) => {
              const assignedProf = professors.find(p => p.id === lab.assignedTo);
              return (
                <tr key={lab.id}>
                  <td>{idx + 1}</td>
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
                  <td>{assignedProf ? assignedProf.name : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 className="mt-5">👩‍🏫 Professor Profiles</h3>
        <div className="row">
          {professors.map(prof => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5>{prof.name}</h5>
                  <p className="mb-1"><strong>Specialization:</strong> {prof.specialization.join(', ')}</p>
                  <p className="mb-1"><strong>Available:</strong> {prof.availability.map(a => `${a.date} (${a.session})`).join(', ')}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => manuallyAssignProfessor(prof.id)}
                  >
                    Assign This Professor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;