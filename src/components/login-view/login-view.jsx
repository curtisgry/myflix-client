import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import PosterSlider from '../poster-slider/poster-slider';

import './login-view.scss';

function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const validate = () => {
    // Reset errors when validate runs
    setUsernameErr('');
    setPasswordErr('');

    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }

    return isReq;
  };

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      return setUsername(e.target.value);
    }
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check form validation returns boolean
    const isReq = validate();
    if (isReq) {
      // Send authentication request to the server
      axios
        .post('https://myflix-api-cgray.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const { data } = response;
          onLoggedIn(data);
        })
        .catch(() => {
          setLoginErr('Username or Password is incorrect');
          console.log('No user found');
        });
    }
  };

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
          <Form className="form-login">
            <Form.Group className="form-item" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                name="username"
                type="text"
                onChange={handleChange}
              />
              {usernameErr ? (
                <spa className="login-error" n>
                  {usernameErr}
                </spa>
              ) : (
                ''
              )}
            </Form.Group>

            <Form.Group className="form-item" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={handleChange}
              />
              {passwordErr ? (
                <span className="login-error">{passwordErr}</span>
              ) : (
                ''
              )}

              {loginErr ? <span className="login-error">{loginErr}</span> : ''}
            </Form.Group>
            <Link to="/register">
              <Button className="sign-up" variant="link">
                Sign Up
              </Button>
            </Link>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginView;
