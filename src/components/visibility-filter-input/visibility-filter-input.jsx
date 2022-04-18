import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput({ visibilityFilter, setFilter }) {
  return (
    <Form.Control
      className="filter-input"
      onChange={(e) => setFilter(e.target.value)}
      value={visibilityFilter}
      placeholder="Filter"
    />
  );
}

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

export default connect(null, { setFilter })(VisibilityFilterInput);
