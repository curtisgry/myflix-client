import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Col, Row } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

function ProfileView({ user, movies }) {
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
  }, [userInfo]);

  const removeFavorite = (movieId) => {
    const userToken = localStorage.getItem('token');
    axios.delete(
      `https://myflix-api-cgray.herokuapp.com/users/${user}/movies/${movieId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
  };

  return (
    <>
      <Link to={`/users/edit/${user}`}>
        <Button variant="link">Edit Profile</Button>
      </Link>
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
      <h3>Favorites List</h3>
      <Row>
        {userInfo.FavoriteMovies
          ? movies
              .filter(
                (movie) => userInfo.FavoriteMovies.indexOf(movie._id) !== -1
              )
              .map((movie) => (
                <Col md={3} key={movie._id}>
                  <MovieCard movie={movie} />
                  <Button
                    variant="link"
                    onClick={() => removeFavorite(movie._id)}
                  >
                    Remove
                  </Button>
                </Col>
              ))
          : ''}
      </Row>
    </>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default ProfileView;
