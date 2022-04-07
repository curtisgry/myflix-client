import React, { useState, useEffect } from 'react';
import axios from 'axios';

import format from 'date-fns/format';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';

function UpdateProfile({ user, onLoggedIn, clearUserOnDelete }) {
  const [userInfo, setUserInfo] = useState({});
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    UsernameErr: '',
    PasswordErr: '',
    EmailErr: '',
    BirthdayErr: '',
  });

  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    axios
      .get(`https://myflix-api-cgray.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUserInfo({ ...res.data, Password: '' });
      })
      .catch(() => {
        console.log('No user found');
      });
  }, []);

  // Returns false when empty and true when not empty
  // isReq should be an updateable variable from upper scope
  // to indicate if errors were found through validation checks
  const checkNotEmptySetError = (keyName, message, isReq) => {
    // Check for value in userInfo object from state
    if (!userInfo[keyName]) {
      // If empty set related error message in validationErrors object
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [`${keyName}Err`]: message,
      }));
      return false;
    }
    // Reset error when requirements are met
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [`${keyName}Err`]: '',
    }));

    // Checks if any validation before has already been false
    if (!isReq) return false;
    // Return true when pass validation
    return true;
  };

  // isReq should be an updateable variable from upper scope
  // to indicate if errors were found through validation checks
  const checkValidEmail = (isReq) => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const isValid = regex.test(userInfo.Email);
    if (!isValid) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        EmailErr: 'Not a valid email',
      }));
    }
    // Check for previous validation faliure
    if (!isReq) return false;
    return isValid;
  };

  // Return true if valid
  const validate = () => {
    let isReq = true;

    // Get array of keys in the userInfo state
    const fields = Object.keys(userInfo).filter(
      (key) => key !== '__v' && key !== '_id' && key !== 'FavoriteMovies'
    );

    // Loop through keys and validate each has data
    fields.forEach((field) => {
      isReq = checkNotEmptySetError(field, `${field} is required`, isReq);
    });

    // Check for email
    if (userInfo.Email) {
      isReq = checkValidEmail(isReq);
    }

    return isReq;
  };

  const deleteUser = (username) => {
    const userToken = localStorage.getItem('token');
    axios
      .delete(`https://myflix-api-cgray.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        localStorage.clear();
        clearUserOnDelete();
      })
      .then(() => {
        history.push('/login');
      })
      .catch((e) => {
        console.log('Could not delete', e);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
    const isReq = validate();

    if (isReq) {
      axios
        .put(
          `https://myflix-api-cgray.herokuapp.com/users/${user}`,
          {
            Username: userInfo.Username,
            Password: userInfo.Password,
            Email: userInfo.Email,
            Birthday: userInfo.Birthday,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((res) => {
          axios
            .post('https://myflix-api-cgray.herokuapp.com/login', {
              Username: userInfo.Username,
              Password: userInfo.Password,
            })
            .then((response) => {
              const { data } = response;
              onLoggedIn(data);
            })
            .catch(() => {
              console.log('No user found');
            });
        })
        .then(() => {
          setIsEditSuccess(true);
        })
        .catch(() => {
          console.log('Something went wrong');
        });
    }
  };

  return (
    <>
      <h2>Update Info</h2>
      {isEditSuccess ? <span>Success!</span> : ''}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            defaultValue={userInfo.Username}
            name="Username"
            type="text"
            onChange={handleChange}
          />
          {validationErrors.UsernameErr ? (
            <span>{validationErrors.UsernameErr}</span>
          ) : (
            ''
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New password:</Form.Label>
          <Form.Control
            name="Password"
            type="password"
            onChange={handleChange}
          />
          {validationErrors.PasswordErr ? (
            <span>{validationErrors.PasswordErr}</span>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            defaultValue={userInfo.Email}
            name="Email"
            type="email"
            onChange={handleChange}
          />
          {validationErrors.EmailErr ? (
            <span>{validationErrors.EmailErr}</span>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Date of Birth:</Form.Label>
          {userInfo.Birthday ? (
            <Form.Control
              defaultValue={format(new Date(userInfo.Birthday), 'yyy-MM-dd')}
              name="Birthday"
              type="date"
              onChange={handleChange}
            />
          ) : (
            ''
          )}
          {validationErrors.BirthdayErr ? (
            <span>{validationErrors.BirthdayErr}</span>
          ) : (
            ''
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Button variant="danger" onClick={() => deleteUser(user)}>
        Delete Account
      </Button>
    </>
  );
}

UpdateProfile.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  clearUserOnDelete: PropTypes.func.isRequired,
};

export default UpdateProfile;
