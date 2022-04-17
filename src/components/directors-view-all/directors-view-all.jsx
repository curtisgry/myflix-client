import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DirectorCard from '../director-card/director-card';

function DirectorsViewAll({ movies }) {
  // Take directors out of movies into new Array
  // then get index of director in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single director
  // filtering out the duplicates.
  const directorList = movies
    .map((movie) => movie.Director)
    .filter(
      (item, index, self) =>
        self.findIndex((dir) => dir.Name === item.Name) === index
    );

  return (
    <div className="content">
      <h2>Directors</h2>
      <Row>
        {directorList.map((director) => (
          <Col lg={12} key={director.Name}>
            <DirectorCard director={director} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

DirectorsViewAll.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default DirectorsViewAll;
