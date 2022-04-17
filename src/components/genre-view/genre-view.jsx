import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';

import './genre-view.scss';

function GenreView({ movies, genre, onBackClick, getFavorites }) {
  return (
    <div>
      <div className="genre-tab-list">
        <Link to="/genres/Action">
          <button type="button">Action</button>
        </Link>
        <Link to="/genres/Science Fiction">
          <button type="button">Science Fiction</button>
        </Link>
        <Link to="/genres/Comedy">
          <button type="button">Comedy</button>
        </Link>
      </div>
      <div className="genre-info">
        <h2>{genre.Name}</h2>
        <p>{genre.Description}</p>
      </div>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie._id}>
            <MovieCard
              movie={movie}
              getFavorites={getFavorites}
              hasDescription
            />
          </Col>
        ))}
      </Row>
      <Button className="back-button" onClick={onBackClick}>
        Back
      </Button>
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
  getFavorites: PropTypes.func.isRequired,
};

export default GenreView;
