import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

function DirectorView({ director, directorMovies, onBackClick }) {
  return (
    <div>
      <div>
        <h2>{director.Name}</h2>
        <p>{director.Bio}</p>
        <Button variant="link" onClick={onBackClick}>
          Back
        </Button>
      </div>
      <Row>
        {directorMovies.map((movie) => (
          <Col md={3} key={movie._id}>
            <MovieCard movie={movie} hasDescription />
          </Col>
        ))}
      </Row>
    </div>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  directorMovies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DirectorView;
