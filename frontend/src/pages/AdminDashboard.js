import { useState } from 'react';
import labsData from '../data/labs.json';
import professorsData from '../data/professors.json';
import { sendLabAssignment } from '../utils/sendMail';

const AdminDashboard = () => {
  const [labList, setLabList] = useState(labsData);

  const handleAssign = (labId, professorId) => {
    const updatedLabs = labList.map((lab) => {
      if (lab.id === labId) {
        const prof = professorsData.find((p) => p.id === professorId);
        sendLabAssignment(prof, lab)
          .then(() => alert(`✅ ${prof.name} assigned and email sent.`))
          .catch(() => alert('❌ Failed to send email.'));

        return {
          ...lab,
          status: 'Assigned',
          assignedTo: professorId,
        };
      }
      return lab;
    });

    setLabList(updatedLabs);
  };

  const getEligibleProfessors = (lab) => {
    const matched = professorsData.filter(
      (p) =>
        p.specialization.includes(lab.subject) &&
        p.availability.some(
          (a) => a.date === lab.date && a.session === lab.session
        )
    );
    return matched.slice(0, 2); // Only top 2 professors
  };

  const groupedLabs = labList.reduce((acc, lab) => {
    acc[lab.date] = acc[lab.date] || [];
    acc[lab.date].push(lab);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📅 Lab Exam Timetable (Assigned & Unassigned)</h3>

      {Object.entries(groupedLabs).map(([date, labsOnDate]) => (
        <div key={date} className="mb-5">
          <h5 className="text-primary mb-3">📅 {date}</h5>
          <table className="table table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Session</th>
                <th>Status</th>
                <th>Professor</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {labsOnDate.map((lab, index) => {
                const assignedProf = professorsData.find(
                  (p) => p.id === lab.assignedTo
                );
                const eligibleProfs = getEligibleProfessors(lab);

                return (
                  <tr key={lab.id}>
                    <td>{index + 1}</td>
                    <td>{lab.subject}</td>
                    <td>{lab.session}</td>
                    <td>
                      {lab.status === 'Assigned' ? (
                        <span className="badge bg-success">Assigned</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Unassigned</span>
                      )}
                    </td>
                    <td>{assignedProf ? assignedProf.name : '-'}</td>
                    <td>
                      {lab.status === 'Unassigned' && (
                        <select
                          className="form-select"
                          onChange={(e) => handleAssign(lab.id, e.target.value)}
                        >
                          <option value="">-- Select --</option>
                          {eligibleProfs.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                              {prof.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;