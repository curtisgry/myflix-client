import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './genre-view-all.scss';

function GenreViewAll({ movies }) {
  // Take genre out of movies into new Array
  // then get index of director in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single genre
  // filtering out the duplicates.
  const genreList = movies
    .map((movie) => movie.Genre)
    .filter(
      (item, index, self) =>
        self.findIndex((gen) => gen.Name === item.Name) === index
    );

  return (
    <div className="content">
      <h2>Genres</h2>
      <Row>
        {genreList.map((genre, i) => (
          <Col className="mb-4" lg={12} key={i}>
            <h4>{genre.Name}</h4>
            <p>{genre.Description}</p>
            <Link to={`/genres/${genre.Name}`}>
              <Button variant="link">View Movies</Button>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

GenreViewAll.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { genres } = state;
  return { genres };
};

export default connect(mapStateToProps)(GenreViewAll);
