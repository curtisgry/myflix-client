import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FavoriteList from './favorite-list';
import UserInfo from './user-info';

function ProfileView({ user, movies, getFavorites }) {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
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
  };

  useEffect(() => {
    getUserInfo();
  });

  const removeFavorite = (movieId) => {
    const userToken = localStorage.getItem('token');
    axios
      .delete(
        `https://myflix-api-cgray.herokuapp.com/users/${user}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then(() => {
        getUserInfo();
        getFavorites(userToken);
      });
  };

  return (
    <div className="content profile-page">
      <h2 className="profile-title">Profile</h2>
      <h3 className="profile-sub-title">Here is your info {user}</h3>
      <Link to={`/users/edit/${user}`}>
        <Button variant="link">Edit Profile</Button>
      </Link>
      {userInfo ? (
        <>
          <UserInfo userInfo={userInfo} />
          <FavoriteList
            favoriteMovies={movies.filter(
              (movie) => userInfo.FavoriteMovies.indexOf(movie._id) !== -1
            )}
            removeFavorite={removeFavorite}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

export default ProfileView;
