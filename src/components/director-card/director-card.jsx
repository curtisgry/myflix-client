import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

function DirectorCard({ director }) {
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

DirectorCard.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default DirectorCard;
