import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import PosterSlider from '../poster-slider/poster-slider';

import './start-view.scss';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';

function StartView({ onLoggedIn }) {

  const location = useLocation();

  return (
    <>
      <div className="logo-bg" />
      <div className="logo-gradient" />
      <div className="login-main">
        <div className="login-page-container login-slider">
          <PosterSlider />
        </div>
        <div className="login-page-container">
          <h1 className="login-page-logo">myFlix</h1>
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

export default StartView;
