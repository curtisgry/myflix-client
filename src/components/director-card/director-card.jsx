import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

function DirectorCard({ director }) {
  return (
    <Col className="mb-4" lg={12}>
      <h4>{director.Name}</h4>
      <p>{director.Bio}</p>
      <Link to={`/directors/${director.Name}`}>
        <Button variant="link">View Movies</Button>
      </Link>
    </Col>
  );
}

DirectorCard.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default DirectorCard;
