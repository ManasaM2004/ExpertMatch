import axios from "axios";
import { useEffect, useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    id: "", // used for update
    professorId: "",
    professorName: "",
    labSubject: "",
    labDate: "",
    labTime: "",
    feedback: ""
  });

  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbackList(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      professorId: "",
      professorName: "",
      labSubject: "",
      labDate: "",
      labTime: "",
      feedback: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update feedback
        await axios.put(`http://localhost:5000/api/feedback/${formData.id}`, formData);
        alert("✅ Feedback updated successfully!");
      } else {
        // Create new feedback
        await axios.post("http://localhost:5000/api/feedback", formData);
        alert("✅ Feedback submitted successfully!");
      }
      resetForm();
      fetchFeedback();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit feedback");
    }
  };

  const handleEdit = (feedback) => {
    setFormData({
      id: feedback._id || feedback.id,
      professorId: feedback.professorId,
      professorName: feedback.professorName,
      labSubject: feedback.labSubject,
      labDate: feedback.labDate,
      labTime: feedback.labTime,
      feedback: feedback.feedback
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      alert("✅ Feedback deleted successfully!");
      fetchFeedback();
      if (formData.id === id) resetForm();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete feedback");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h3>{formData.id ? "✏️ Edit Feedback" : "📩 Submit Lab Feedback"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="professorId"
          placeholder="Professor ID"
          value={formData.professorId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          name="professorName"
          placeholder="Professor Name"
          value={formData.professorName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          name="labSubject"
          placeholder="Lab Subject"
          value={formData.labSubject}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="form-control mb-2"
          name="labDate"
          value={formData.labDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          name="labTime"
          placeholder="Lab Time (e.g., 9 AM - 12 PM)"
          value={formData.labTime}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-3"
          name="feedback"
          rows="4"
          placeholder="Enter your feedback..."
          value={formData.feedback}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className={`btn ${formData.id ? "btn-primary" : "btn-success"} w-100`}
        >
          {formData.id ? "Update Feedback" : "Submit Feedback"}
        </button>
        {formData.id && (
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      <h4>Existing Feedback</h4>
      {feedbackList.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <ul className="list-group">
          {feedbackList.map((fb) => (
            <li
              key={fb._id || fb.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>{fb.professorName}</strong> ({fb.professorId}) —{" "}
                {fb.labSubject} on {fb.labDate} at {fb.labTime}
                <p>{fb.feedback}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleEdit(fb)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(fb._id || fb.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feedback;
