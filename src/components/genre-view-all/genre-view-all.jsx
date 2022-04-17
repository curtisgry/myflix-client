import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './genre-view-all.scss';

function GenreViewAll({ genres }) {
  return (
    <div className="content">
      <h2>Genres</h2>
      <Row>
        {genres.map((genre, i) => (
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
  genres: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { genres } = state;
  return { genres };
};

export default connect(mapStateToProps)(GenreViewAll);
