// ✅ Updated ProfessorCard.js to allow manual assignment and send email

import { Button, Card } from 'react-bootstrap';

const ProfessorCard = ({ professor, onAssign }) => {
  return (
    <div className="col-md-4 mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="text-center">
          <img
            src={professor.image}
            alt={professor.name}
            className="rounded-circle mb-3"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
          <Card.Title>{professor.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{professor.college}</Card.Subtitle>
          <Card.Text className="mb-1">
            <strong>Email:</strong> {professor.email}<br />
            <strong>Phone:</strong> {professor.phone}<br />
            <strong>Specialization:</strong> {professor.specialization.join(', ')}<br />
            <strong>Availability:</strong><br />
            {professor.availability.map((a, i) => (
              <div key={i}>{a.date} ({a.session})</div>
            ))}
          </Card.Text>
          <Button variant="success" onClick={() => onAssign(professor.id)}>
            ✅ Assign This Professor
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfessorCard;
