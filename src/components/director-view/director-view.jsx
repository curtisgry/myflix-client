import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';

import './director-view.scss';

function DirectorView({ director, directorMovies, onBackClick, getFavorites }) {
  return (
    <div>
      <div className="director-tab-list">
        <Link to="/directors/Christopher Nolan">
          <button type="button">Christopher Nolan</button>
        </Link>
        <Link to="/directors/Denis Villeneuve">
          <button type="button">Denis Villeneuve</button>
        </Link>
        <Link to="/directors/Steven Spielberg">
          <button type="button">Steven Spielberg</button>
        </Link>
        <Link to="/directors/Adam McKay">
          <button type="button">Adam McKay</button>
        </Link>
        <Link to="/directors/George Lucas">
          <button type="button">George Lucas</button>
        </Link>
      </div>
      <div className="director-info">
        <h2>{director.Name}</h2>
        <p>{director.Bio}</p>
      </div>
      <Row>
        {directorMovies.map((movie) => (
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  directorMovies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

export default DirectorView;
