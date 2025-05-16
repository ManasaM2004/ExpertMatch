import axios from "axios";
import { useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    professorId: "",
    professorName: "",
    labSubject: "",
    labDate: "",
    labTime: "",
    feedback: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      alert("✅ Feedback submitted successfully!");
      setFormData({
        professorId: "",
        professorName: "",
        labSubject: "",
        labDate: "",
        labTime: "",
        feedback: ""
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit feedback");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3>📩 Submit Lab Feedback</h3>
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
        <button type="submit" className="btn btn-success w-100">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;