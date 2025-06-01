import { useState } from 'react';
import externalProfessors from '../data/externalProfessors.json';
import internalProfessors from '../data/internalProfessors.json';
import labsData from '../data/labs.json';
import { sendLabAssignment } from '../utils/sendMail';

const AdminDashboard = () => {
  const [labList, setLabList] = useState(
    Array.isArray(labsData)
      ? labsData.map((lab, i) => ({
           id:`${lab.subject}-${lab.date}-${lab.session}-${i}`,
          ...lab,
          assignedInternal: lab.assignedInternal || null,
          assignedExternal: lab.assignedExternal || null
        }))
      : []
  );

  const assignProfessor = (labId, professorId, type) => {
    const updatedLabs = labList.map((lab) => {
      if (lab.id === labId) {
        const allProfs = [...internalProfessors, ...externalProfessors];
        const prof = allProfs.find((p) => p.id === professorId);

        sendLabAssignment(prof, lab)
          .then(() => alert(`✅${prof.name} assigned and email sent.`))
          .catch(() => alert('❌ Failed to send email'));

        return {
          ...lab,
          [`assigned${type}`]:professorId
        };
      }
      return lab;
    });

    setLabList(updatedLabs);
  };

  const getEligibleProfs = (lab, profList) => {
    return profList
      .filter(
        (p) =>
          p.specialization.includes(lab.subject) &&
          p.availability.some(
            (a) => a.date === lab.date && a.session === lab.session
          )
      )
      .slice(0, 5);
  };

  const groupedLabs = labList.reduce((acc, lab) => {
    acc[lab.date] = acc[lab.date] || [];
    acc[lab.date].push(lab);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📅 Lab Exam Timetable</h3>

      {Object.entries(groupedLabs).map(([date, labs]) => (
        <div key={date} className="mb-5">
          <h5 className="text-primary mb-3">📆 {date}</h5>
          <table className="table table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Session</th>
                <th>Status</th>
                <th>Internal Professor</th>
                <th>Assign Internal</th>
                <th>External Professor</th>
                <th>Assign External</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {labs.map((lab, index) => {
                const internal = internalProfessors.find(
                  (p) => p.id === lab.assignedInternal
                );
                const external = externalProfessors.find(
                  (p) => p.id === lab.assignedExternal
                );
                const eligibleInternal = getEligibleProfs(lab, internalProfessors);
                const eligibleExternal = getEligibleProfs(lab, externalProfessors);

                return (
                  <tr key={lab.id}>
                    <td>{index + 1}</td>
                    <td>{lab.subject}</td>
                    <td>{lab.session}</td>
                    <td>
                      {internal && external ? (
                        <span className="badge bg-success">Fully Assigned</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )}
                    </td>
                    <td>{internal ? internal.name : '-'}</td>
                    <td>
                      {!internal && (
                        <select
                          className="form-select"
                          onChange={(e) =>
                            assignProfessor(lab.id, e.target.value, 'Internal')
                          }
                        >
                          <option value="">-- Select --</option>
                          {eligibleInternal.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td>{external ? external.name : '-'}</td>
                    <td>
                      {!external && (
                        <select
                          className="form-select"
                          onChange={(e) =>
                            assignProfessor(lab.id, e.target.value, 'External')
                          }
                        >
                          <option value="">-- Select --</option>
                          {eligibleExternal.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
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