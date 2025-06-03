# 🚀 ExpertMatch – Automated External Examiner Allocation

> A full-stack DevOps-based platform to automate examiner allocation using domain expertise, availability, and real-time notifications for Computer Science lab exams.

---

## 🌟 Features

- 🧠 AI-based domain expertise mapping
- 🕒 Availability-based assignment (3 sessions/day)
- 🔐 Admin Dashboard with login
- 📧 Email & SMS notifications via EmailJS and Twilio
- 📊 Feedback system for external examiners
- 🐳 Docker-based deployment with CI/CD
- ✅ Code quality tested using SonarCloud

---

## 🛠 Tech Stack

| Layer        | Technologies                           |
|--------------|----------------------------------------|
| *Frontend* | React.js, Bootstrap, React Router      |
| *Backend*  | Node.js, Express.js                    |
| *Database* | MongoDB                                |
| *CI/CD*    | Jenkins, GitHub Actions, Docker        |
| *Deployment* | Render                              |
| *Monitoring* | SonarCloud                          |
| *Testing* | Postman (API Testing)                   |
| *Notifications* | EmailJS, Twilio                  |

---

## 🔍 Project Modules

- 👩‍🏫 Internal & External Professor Allocation
- 🧾 Lab Exam Timetable Generator
- 📬 Email/SMS Notifications
- 🗃️ Feedback Form
- 🧮 CI/CD Pipeline using Jenkins + Docker + GitHub Actions

---

## 🌐 Live Project

Deployed at: [https://expertmatch.onrender.com](https://expertmatch.onrender.com)

---

## 🔌 API Endpoints (Tested via Postman)

*Base URL:* http://localhost:5000/api/feedback

- GET /feedback : Fetch all feedback
- POST /feedback : Submit new feedback
- PUT /feedback/:id : Update feedback by ID
- DELETE /feedback/:id : Delete feedback by ID

---

## 🧪 Local Setup

Clone the repository and run both frontend and backend:

bash
git clone https://github.com/ManasaM2004/expertmatch.git
cd expertmatch


### 📦 Backend

bash
cd backend
node server.js


### 🌐 Frontend

bash
cd frontend
npm install
npm start


The application will be available at http://localhost:3000

---

## 🙋‍♀️ Author

- 🔗 LinkedIn: [linkedin.com/in/manasa-m-21b2a4281](https://linkedin.com/in/manasa-m-21b2a4281)
- 🐙 GitHub: [github.com/ManasaM2004](https://github.com/ManasaM2004)

---

## 📄 License

This project is licensed under the MIT License.