import axios from 'axios';
import { useEffect, useState } from 'react';

const LabDashboard = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/labs/dashboard');
        console.log("Fetched Labs:", res.data); // ✅ For debugging
        setLabs(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch labs", err);
      }
    };

    fetchLabs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🧪 Lab Examiner Dashboard</h2>

      {labs.length === 0 ? (
        <p className="text-center text-gray-600">No lab records found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300 shadow-lg">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Dates</th>
              <th className="border px-4 py-2">Internal Examiner</th>
              <th className="border px-4 py-2">External Examiner</th>
              <th className="border px-4 py-2">Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab, index) => (
              <tr key={lab._id} className="text-center">
                <td className="border px-4 py-2">{lab.subject}</td>
                <td className="border px-4 py-2">
                  {lab.examDates?.map((d) => new Date(d).toLocaleDateString()).join(' & ')}
                </td>
                <td className="border px-4 py-2">
                  {lab.internalExaminer?.name || <span className="text-red-500">Unassigned</span>}
                </td>
                <td className="border px-4 py-2">
                  {lab.externalExaminer?.name || <span className="text-red-500">Unassigned</span>}
                </td>
                <td className="border px-4 py-2 font-bold">
                  {lab.externalExaminer?.confirmed ? (
                    <span className="text-green-600">✅ Confirmed</span>
                  ) : (
                    <span className="text-yellow-600">❌ Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LabDashboard;
