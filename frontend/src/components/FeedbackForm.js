import axios from 'axios';
import { useState } from 'react';

const FeedbackForm = () => {
  const [form, setForm] = useState({
    professorId: '',
    professorName: '',
    labSubject: '',
    labDate: '',
    labTime: '',
    feedback: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/feedback', form);
      alert(res.data.message);
      setForm({
        professorId: '',
        professorName: '',
        labSubject: '',
        labDate: '',
        labTime: '',
        feedback: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('❌ Failed to submit feedback');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">📝 Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="professorId" placeholder="Professor ID" value={form.professorId} onChange={handleChange} required />
        <input className="form-control mb-2" name="professorName" placeholder="Professor Name" value={form.professorName} onChange={handleChange} required />
        <input className="form-control mb-2" name="labSubject" placeholder="Lab Subject" value={form.labSubject} onChange={handleChange} required />
        <input className="form-control mb-2" name="labDate" placeholder="Lab Date" value={form.labDate} onChange={handleChange} required />
        <input className="form-control mb-2" name="labTime" placeholder="Lab Time" value={form.labTime} onChange={handleChange} required />
        <textarea className="form-control mb-3" name="feedback" placeholder="Feedback" value={form.feedback} onChange={handleChange} required />
        <button className="btn btn-primary w-100" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;