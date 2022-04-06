import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export default function DirectorCard({ director }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Text>{director.Bio}</Card.Text>
        <Link to={`/directors/${director.Name}`}>
          <Button variant="link">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
