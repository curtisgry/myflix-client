import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';

import './genre-view.scss';

function GenreView({ movies, genre, genres, onBackClick, getFavorites }) {
  const { name } = useParams();
  return (
    <div className="content">
      <h2 className="genre-page-heading">Genres</h2>
      <div className="genre-tab-list">
        {genres.map((gen) => (
          <Link to={`/genres/${gen.Name}`} key={gen.Name}>
            <button
              className={name === gen.Name ? 'selected-genre' : ''}
              type="button"
            >
              {gen.Name}
            </button>
          </Link>
        ))}
      </div>
      <div className="genre-info">
        <h2>{genre.Name}</h2>
        <p>{genre.Description}</p>
      </div>
      <Row>
        {movies.map((movie) => (
          <Col className="mb-4" md={4} key={movie._id}>
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
  genres: PropTypes.array.isRequired,
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { genres } = state;
  return { genres };
};

export default connect(mapStateToProps)(GenreView);
