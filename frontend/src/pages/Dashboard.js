import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import externalProfessors from '../data/externalProfessors.json';
import internalProfessors from '../data/internalProfessors.json';
import labsData from '../data/labs.json';
import { sendLabAssignment } from '../utils/sendMail';

const allProfessors = [...externalProfessors, ...internalProfessors];

const Dashboard = () => {
  const [labs, setLabs] = useState(labsData);

  const manuallyAssignProfessor = (profId) => {
    const prof = allProfessors.find(p => p.id === profId);
    const match = labs.find(
      l =>
        l.status === 'Unassigned' &&
        prof.specialization.includes(l.subject) &&
        prof.availability.some(a => a.date === l.date && a.session === l.session)
    );

    if (match) {
      const updatedLabs = labs.map(l =>
        l.subject === match.subject &&
        l.date === match.date &&
        l.session === match.session
          ? { ...l, status: 'Assigned', professor: prof.name }
          : l
      );
      setLabs(updatedLabs);

      sendLabAssignment(prof, match)
        .then(() => alert(`✅ ${prof.name} assigned to ${match.subject} - ${match.session}`))
        .catch(() => alert('❌ Failed to send email.'));
    } else {
      alert('❌ No matching unassigned lab for this professor.');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h3>📅 Scheduled Labs</h3>
        <table className="table table-bordered text-center">
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
            {labs.map((lab, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{lab.subject}</td>
                <td>{lab.date}</td>
                <td>{lab.session}</td>
                <td>
                  {lab.status === 'Assigned' ? (
                    <span className="badge bg-success">Assigned</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Unassigned</span>
                  )}
                </td>
                <td>{lab.professor || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-5 text-primary">👩‍🏫 External Professor Profiles</h3>
        <div className="row">
          {externalProfessors.map(prof => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card shadow">
                <div className="card-body text-center">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5>{prof.name}</h5>
                  <p><strong>College:</strong> {prof.college}</p>
                  <p><strong>Specialization:</strong> {prof.specialization.join(', ')}</p>
                  <p><strong>Available:</strong> {prof.availability.map(a => `${a.date} (${a.session})`).join(',')}</p>
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

        <h3 className="mt-5 text-success">🏫 Internal Professor Profiles</h3>
        <div className="row">
          {internalProfessors.map(prof => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card shadow">
                <div className="card-body text-center">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5>{prof.name}</h5>
                  <p><strong>College:</strong> {prof.college}</p>
                  <p><strong>Specialization:</strong> {prof.specialization.join(', ')}</p>
                  <p><strong>Available:</strong> {prof.availability.map(a => `${a.date} (${a.session})`).join(',')}</p>
                  <button
                    className="btn btn-secondary mt-2"
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