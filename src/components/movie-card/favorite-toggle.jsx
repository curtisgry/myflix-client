import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions/actions';
// import FavoriteToggleIcon from './favorite-toggle-icon';

import './movie-card.scss';

function FavoriteToggle({ isFavorite, movieId, user, getFavorites }) {
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
        // if (typeof getUserInfo === 'function') {
        //   getUserInfo();
        // }
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
        // if (typeof getUserInfo === 'function') {
        //   getUserInfo();
        // }
      });
  };

  return (
    <div>
      <button
        className="favorite-toggle"
        type="button"
        onClick={() => {
          if (!isFavorite) {
            addToFavorites();
          } else {
            removeFromFavorites();
          }
        }}
      >
        {/* <svg className="favorite-icon" viewBox="0 0 358.299 358.299">
          <path d="M251.787 27.034c-27.396 0-53.066 10.247-72.638 28.581-19.572-18.334-45.242-28.581-72.638-28.581C47.781 27.034 0 74.816 0 133.547c0 28.929 9.521 57.409 28.298 84.647 14.518 21.06 34.603 41.417 59.695 60.504 42.092 32.02 83.649 49.464 85.398 50.191l5.715 2.376 5.728-2.345c1.75-.716 43.334-17.913 85.448-49.817 25.107-19.02 45.202-39.37 59.727-60.486 18.772-27.29 28.29-55.911 28.29-85.069 0-58.732-47.781-106.514-106.512-106.514zm-72.606 271.591C151.149 285.642 30 224.254 30 133.547c0-42.189 34.323-76.512 76.512-76.512 23.976 0 46.114 10.929 60.738 29.985l11.9 15.507 11.9-15.507c14.624-19.056 36.762-29.985 60.738-29.985 42.188 0 76.512 34.323 76.512 76.512-.001 91.359-121.099 152.224-149.119 165.078z" />
        </svg> */}
        <svg
          className={
            isFavorite ? 'favorite-icon favorite-icon-true' : 'favorite-icon'
          }
          viewBox="0 0 302.489 302.489"
        >
          <path d="M302.351 98.012c-1.116-20.846-9.942-40.422-24.855-55.122-15.103-14.887-34.811-23.086-55.491-23.086-30.776 0-53.082 24.334-65.065 37.408-1.85 2.019-4.018 4.384-5.527 5.827-1.208-1.25-2.845-3.114-4.351-4.828-10.944-12.466-33.72-38.406-66.571-38.406-20.68 0-40.387 8.199-55.49 23.086C10.087 57.59 1.259 77.165.143 98.012c-1.111 20.812 4.212 38.921 17.26 58.72 10.324 15.669 37.545 46.266 66.195 74.408 14.757 14.495 28.339 26.779 39.277 35.524 17.762 14.2 24.565 16.021 28.506 16.021 3.695 0 10.683-1.657 28.615-15.981 10.913-8.717 24.448-20.982 39.143-35.468 28.393-27.99 55.515-58.628 65.956-74.507 8.782-13.357 18.679-32.1 17.256-58.717z" />
        </svg>
      </button>
    </div>
  );
}

FavoriteToggle.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movieId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { favorites, user } = state;
  return { favorites, user };
};

export default connect(mapStateToProps, { addFavorite, removeFavorite })(
  FavoriteToggle
);
