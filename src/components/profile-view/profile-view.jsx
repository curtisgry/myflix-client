import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

function ProfileView({ user }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    axios
      .get(`https://myflix-api-cgray.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUserInfo({ ...res.data });
      })
      .catch(() => {
        console.log('no user found');
      });
  }, []);

  return (
    <>
      <ListGroup as="ul">
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
      <Link to={`/users/edit/${user}`}>
        <Button variant="link">Edit Profile</Button>
      </Link>
    </>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
};

export default ProfileView;
