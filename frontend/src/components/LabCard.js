
const LabCard = ({ lab, professors, onManualAssign }) => {
  // Filter professors who match this lab's subject and are available at the same time
  const eligibleProfs = professors.filter(
    prof =>
      prof.specialization.includes(lab.subject) &&
      prof.availability.some(a => a.date === lab.date && a.session === lab.session)
  );

  const handleAssign = (e) => {
    const selectedProfId = e.target.value;
    if (selectedProfId) {
      onManualAssign(lab.id, selectedProfId);
    }
  };

  const assignedProf = professors.find(p => p.id === lab.assignedTo);

  return (
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm p-3">
        <h5>{lab.subject} Lab</h5>
        <p><strong>Date:</strong> {lab.date}</p>
        <p><strong>Session:</strong> {lab.session}</p>
        <p>
          <strong>Status:</strong>{' '}
          {lab.status === 'Assigned' ? (
            <span className="badge bg-success">Assigned</span>
          ) : (
            <span className="badge bg-warning text-dark">Unassigned</span>
          )}
        </p>
        <p>
          <strong>Assigned To:</strong>{' '}
          {assignedProf ? assignedProf.name : 'None'}
        </p>

        {lab.status === 'Unassigned' && eligibleProfs.length > 0 && (
          <>
            <label className="form-label">Select a Professor:</label>
            <select className="form-select" defaultValue="" onChange={handleAssign}>
              <option value="">-- Choose Professor --</option>
              {eligibleProfs.map(prof => (
                <option key={prof.id} value={prof.id}>
                  {prof.name} ({prof.college})
                </option>
              ))}
            </select>
          </>
        )}

        {lab.status === 'Unassigned' && eligibleProfs.length === 0 && (
          <p className="text-danger mt-2">❌ No available professors for this lab</p>
        )}
      </div>
    </div>
  );
};

export default LabCard;
