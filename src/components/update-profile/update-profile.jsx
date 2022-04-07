import React, { useState, useEffect } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateProfile({ user, onLoggedIn }) {
  const [userInfo, setUserInfo] = useState({});
  const [isEditSuccess, setIsEditSuccess] = useState(false);

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
        console.log('no user found');
      });
  }, []);

  const [validationErrors, setValidationErrors] = useState({
    UsernameErr: '',
    PasswordErr: '',
    EmailErr: '',
    BirthdayErr: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
    const isReq = validate();
    const { Username, Password, Email, Birthday } = userInfo;

    if (isReq) {
      axios
        .put(
          `https://myflix-api-cgray.herokuapp.com/users/${user}`,
          {
            Username,
            Password,
            Email,
            Birthday,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((res) => {
          axios
            .post('https://myflix-api-cgray.herokuapp.com/login', {
              Username: res.data.Username,
              Password: res.data.Password,
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
      <Form onSubmit={handleSubmit}>
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
        <Form.Group controlId="formBirthday">
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
    </>
  );
}

UpdateProfile.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};

export default UpdateProfile;
