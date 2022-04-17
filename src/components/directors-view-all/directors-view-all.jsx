import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import DirectorCard from '../director-card/director-card';

function DirectorsViewAll({ directors }) {
  return (
    <div className="content">
      <h2>Directors</h2>
      <Row>
        {directors.map((director) => (
          <Col lg={12} key={director.Name}>
            <DirectorCard director={director} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

DirectorsViewAll.propTypes = {
  directors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { directors } = state;
  return { directors };
};

export default connect(mapStateToProps)(DirectorsViewAll);
