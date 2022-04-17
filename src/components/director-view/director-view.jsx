import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';

import './director-view.scss';

function DirectorView({
  director,
  directors,
  directorMovies,
  onBackClick,
  getFavorites,
}) {
  const { name } = useParams();
  return (
    <div>
      <div className="director-tab-list">
        {directors.map((dir) => (
          <Link to={`/directors/${dir.Name}`} key={dir.Name}>
            <button
              className={dir.Name === name ? 'selected-director' : ''}
              type="button"
            >
              {dir.Name}
            </button>
          </Link>
        ))}
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
  directors: PropTypes.array.isRequired,
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  directorMovies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { directors } = state;
  return { directors };
};

export default connect(mapStateToProps)(DirectorView);
