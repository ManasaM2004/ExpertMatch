
const About = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Profile Image */}
        <div className="col-md-4 text-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/139250248?v=4"
            alt="Dr. Manasa"
            className="img-fluid rounded-circle shadow"
            style={{ maxWidth: '180px' }}
          />
        </div>

        {/* Profile Details */}
        <div className="col-md-8">
          <h2>Dr. Manasa M</h2>
          <p className="lead text-muted">
            Professor, Department of Computer Science & Engineering<br />
            Ramaiah Institute of Technology, Bangalore
          </p>

          <p><strong>🌩️ Specialization:</strong> Cloud Computing</p>
          <p><strong>📞 Contact:</strong> +91-98765-43210</p>
          <p><strong>📧 Email:</strong> manasa.cloud@msrit.edu</p>

          <p>
            <strong>🔗 LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/manasa-m-21b2a4281"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/manasa-m-21b2a4281
            </a>
          </p>

          <p>
            <strong>🐙 GitHub:</strong>{' '}
            <a
              href="https://github.com/ManasaM2004"
              target="_blank"
              rel="noreferrer"
            >
              github.com/ManasaM2004
            </a>
          </p>

          {/* Unique Quote */}
          <div className="bg-light p-3 rounded shadow mt-4">
            <blockquote className="blockquote mb-0">
              <p className="mb-0">“Empowering students to innovate, build, and lead through technology.”</p>
              <footer className="blockquote-footer mt-2">Dr. Manasa M</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
