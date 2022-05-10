import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import PosterSlider from '../poster-slider/poster-slider';

import './start-view.scss';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';

function StartView({ onLoggedIn }) {
  const location = useLocation();

  return (
    <>
      {/* Background html */}
      <div className="logo-bg" />
      <div className="logo-gradient" />
      {/* Background html */}
      <h1 className="login-page-logo">myFlix</h1>
      <div className="login-main">
        <div className="login-page-container login-slider">
          <PosterSlider />
        </div>
        <div className="login-page-container">
          {location.pathname.includes('/register') ? (
            <RegistrationView onLoggedIn={onLoggedIn} />
          ) : (
            <LoginView onLoggedIn={onLoggedIn} />
          )}
        </div>
      </div>
    </>
  );
}

StartView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default StartView;
