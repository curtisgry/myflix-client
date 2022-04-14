import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions/actions';

function FavoriteToggle({
  isFavorite,
  movieId,

  user,
  getFavorites,
  getUserInfo,
}) {
  const addToFavorites = () => {
    const userToken = localStorage.getItem('token');
    axios
      .post(
        `https://myflix-api-cgray.herokuapp.com/users/${user}/movies/${movieId}`,
        null,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then(() => {
        const token = localStorage.getItem('token');
        addFavorite(movieId);
        getFavorites(token);
        if (typeof getUserInfo === 'function') {
          getUserInfo();
        }
      })
      .catch((e) => {
        console.log(`Something went wrong${e}`);
      });
  };

  const removeFromFavorites = () => {
    const userToken = localStorage.getItem('token');
    axios
      .delete(
        `https://myflix-api-cgray.herokuapp.com/users/${user}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then(() => {
        removeFavorite(movieId);
        getFavorites(userToken);
        if (typeof getUserInfo === 'function') {
          getUserInfo();
        }
      });
  };

  return (
    <div>
      {!isFavorite ? (
        <button type="button" onClick={addToFavorites}>
          <img
            alt="a small heart icon to indicate a movie on your favorites list"
            className="favorite-icon"
            src="https://img.icons8.com/ios/50/000000/like--v1.png"
            crossOrigin="anonymous"
          />
        </button>
      ) : (
        <button type="button" onClick={removeFromFavorites}>
          <img
            alt="a small heart icon to indicate a movie on your favorites list"
            className="favorite-icon"
            src="https://img.icons8.com/ios-filled/50/000000/like--v1.png"
            crossOrigin="anonymous"
          />
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { favorites, user } = state;
  return { favorites, user };
};

export default connect(mapStateToProps, { addFavorite, removeFavorite })(
  FavoriteToggle
);
