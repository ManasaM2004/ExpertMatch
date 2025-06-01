// src/pages/Feedback.js
import axios from "axios";
import { useEffect, useState } from "react";

const Feedback = () => {
  // 1) Form state
  const [formData, setFormData] = useState({
    professorId: "",
    professorName: "",
    labSubject: "",
    labDate: "",
    labTime: "",
    feedback: ""
  });

  // 2) List of all feedback entries
  const [feedbackList, setFeedbackList] = useState([]);

  // 3) Edit mode flags
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 4) ALWAYS use the full URL here:
  //    (if your backend truly lives at localhost:5000)
  const API_URL = "http://localhost:5000/api/feedback";

  // ───────────────────────────────────────────────────────────────────
  // Fetch feedback list on mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(API_URL);
      setFeedbackList(response.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      alert("❌ Could not load feedback entries.");
    }
  };

  // ───────────────────────────────────────────────────────────────────
  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Clear the form and exit “edit” mode
  const clearForm = () => {
    setFormData({
      professorId: "",
      professorName: "",
      labSubject: "",
      labDate: "",
      labTime: "",
      feedback: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  // ───────────────────────────────────────────────────────────────────
  // Create or Update on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing && editingId) {
        // ─── UPDATE: use full URL including editingId ───
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert("✅ Feedback updated!");
      } else {
        // ─── CREATE: post to the same base URL ───
        await axios.post(API_URL, formData);
        alert("✅ Feedback submitted!");
      }
      clearForm();
      fetchFeedbacks();
    } catch (err) {
      console.error("Error on submit:", err);
      alert(isEditing ? "❌ Failed to update feedback." : "❌ Failed to submit feedback.");
    }
  };

  // ───────────────────────────────────────────────────────────────────
  // Begin editing an existing entry
  const handleEdit = (entry) => {
    const idToEdit = entry._id || entry.id; // whichever your backend uses
    setEditingId(idToEdit);
    setIsEditing(true);
    setFormData({
      professorId: entry.professorId,
      professorName: entry.professorName,
      labSubject: entry.labSubject,
      labDate: entry.labDate,
      labTime: entry.labTime,
      feedback: entry.feedback
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ───────────────────────────────────────────────────────────────────
  // Delete an entry
  const handleDelete = async (entry) => {
    const idToDelete = entry._id || entry.id;
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${idToDelete}`);
      alert("🗑️ Feedback deleted");
      if (isEditing && editingId === idToDelete) {
        clearForm();
      }
      fetchFeedbacks();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete feedback.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      {/* ─── Form Header ─── */}
      <h3 className="mb-4">
        {isEditing ? "✏️ Edit Lab Feedback" : "📩 Submit Lab Feedback"}
      </h3>

      {/* ─── Feedback Form ─── */}
      <form onSubmit={handleSubmit}>
        <div className="row gx-2">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              name="professorId"
              placeholder="Professor ID"
              value={formData.professorId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-8 mb-2">
            <input
              type="text"
              className="form-control"
              name="professorName"
              placeholder="Professor Name"
              value={formData.professorName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row gx-2">
          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              name="labSubject"
              placeholder="Lab Subject"
              value={formData.labSubject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="date"
              className="form-control"
              name="labDate"
              value={formData.labDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              name="labTime"
              placeholder="Lab Time (e.g., 9 AM - 12 PM)"
              value={formData.labTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="feedback"
            rows="4"
            placeholder="Enter your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className={`btn ${isEditing ? "btn-primary" : "btn-success"} me-2 flex-grow-1`}
          >
            {isEditing ? "Update Feedback" : "Submit Feedback"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary flex-grow-1"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="my-5" />

      {/* ─── List of Feedback Entries ─── */}
      <h4 className="mb-3">🗒️ All Feedback Entries</h4>
      {feedbackList.length === 0 ? (
        <p className="text-muted">No feedback entries yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Professor ID</th>
                <th>Professor Name</th>
                <th>Lab Subject</th>
                <th>Lab Date</th>
                <th>Lab Time</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((entry, index) => {
                // adjust to match your backend's ID field
                const entryId = entry._id || entry.id;
                return (
                  <tr key={entryId}>
                    <td>{index + 1}</td>
                    <td>{entry.professorId}</td>
                    <td>{entry.professorName}</td>
                    <td>{entry.labSubject}</td>
                    <td>{entry.labDate}</td>
                    <td>{entry.labTime}</td>
                    <td style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                      {entry.feedback}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(entry)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Feedback;
