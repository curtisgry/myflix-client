import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

function GenreView({ movies, genre, onBackClick }) {
  return (
    <div>
      <div>
        <h2>{genre.Name}</h2>
        <p>{genre.Description}</p>
        <Button variant="link" onClick={onBackClick}>
          Back
        </Button>
      </div>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie._id}>
            <MovieCard movie={movie} hasDescription />
          </Col>
        ))}
      </Row>
    </div>
  );
}

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default GenreView;
