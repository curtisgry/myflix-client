import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';
import { Link } from 'react-router-dom';
import { checkNotEmptySetError, checkValidEmail } from '../../lib/validators';

function RegistrationView({ onLoggedIn }) {
  const [userInfo, setUserInfo] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    UsernameErr: '',
    PasswordErr: '',
    EmailErr: '',
    BirthdayErr: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Return true if valid
  const validate = () => {
    let isReq = true;

    // Get array of keys in the userInfo state
    const fields = Object.keys(userInfo);

    // Loop through keys and validate each has data
    fields.forEach((field) => {
      isReq = checkNotEmptySetError({
        objectData: userInfo,
        keyName: field,
        message: `${field} is required`,
        isReq,
        setStateFunc: setValidationErrors,
      });
    });

    // Check for email
    if (userInfo.Email) {
      isReq = checkValidEmail({
        value: userInfo.Email,
        isReq,
        setStateFunc: setValidationErrors,
      });
    }
    return isReq;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isReq = validate();
    if (!isReq) {
      setIsLoading(false);
      console.log('Validation errors present');
      return;
    }
    const { Username, Password, Email, Birthday } = userInfo;
    // Create user on api
    axios
      .post('https://myflix-api-cgray.herokuapp.com/users', {
        Username,
        Password,
        Email,
        Birthday,
      })
      .then((res) => {
        // Login new user
        axios
          .post('https://myflix-api-cgray.herokuapp.com/login', {
            Username,
            Password,
          })
          .then((res) => {
            const { data } = res;
            // From main view component, generates JWT
            onLoggedIn(data);
          })
          .catch(() => {
            console.log('No user found');
          });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log('Something went wrong: ', e);
      });
  };

  return (
    <Form className="form-main" onSubmit={handleSubmit}>
      <Form.Group className="form-item" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control name="Username" type="text" onChange={handleChange} />
        {validationErrors.UsernameErr ? (
          <span className="register-error">{validationErrors.UsernameErr}</span>
        ) : (
          ''
        )}
      </Form.Group>

      <Form.Group className="form-item" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control name="Password" type="password" onChange={handleChange} />
        {validationErrors.PasswordErr ? (
          <span className="register-error">{validationErrors.PasswordErr}</span>
        ) : (
          ''
        )}
      </Form.Group>
      <Form.Group className="form-item" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control name="Email" type="email" onChange={handleChange} />
        {validationErrors.EmailErr ? (
          <span className="register-error">{validationErrors.EmailErr}</span>
        ) : (
          ''
        )}
      </Form.Group>
      <Form.Group className="form-item" controlId="formBirthday">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control name="Birthday" type="date" onChange={handleChange} />
        {validationErrors.BirthdayErr ? (
          <span className="register-error">{validationErrors.BirthdayErr}</span>
        ) : (
          ''
        )}
      </Form.Group>
      <Link to="/">
        <Button className="sign-up" variant="link">
          Already have an account?
        </Button>
      </Link>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="loading-spinner-reg">
        {isLoading ? <Spinner animation="border" variant="light" /> : ''}
      </div>
    </Form>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default RegistrationView;
