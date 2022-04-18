import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ListGroup from 'react-bootstrap/ListGroup';

function UserInfo({ userInfo }) {
  return (
    <ListGroup className="info-list" as="ul">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Username</div>
          {userInfo.Username}
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Email</div>
          {userInfo.Email}
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        {userInfo.Birthday ? (
          <div className="ms-2 me-auto">
            <div className="fw-bold">Birthdate</div>
            {format(new Date(userInfo.Birthday), 'MMMM do, yyyy')}
          </div>
        ) : (
          ''
        )}
      </ListGroup.Item>
    </ListGroup>
  );
}

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfo;
