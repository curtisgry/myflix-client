import React, { useState, useEffect } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import { checkNotEmptySetError, checkValidEmail } from '../../lib/validators';
import './update-profile.scss';

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

  // Return true if valid
  const validate = () => {
    let isReq = true;

    // Get array of keys in the userInfo state
    const fields = Object.keys(userInfo).filter(
      (key) => key !== '__v' && key !== '_id' && key !== 'FavoriteMovies'
    );
    console.log(fields);
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

  const deleteUser = (username) => {
    const userToken = localStorage.getItem('token');
    axios
      .delete(`https://myflix-api-cgray.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        localStorage.clear();
        clearUserOnDelete();
        setUser(null);
      })
      .then(() => {
        history.push('/confirmation');
        window.location.reload();
      })
      .catch((e) => {
        console.log('Could not delete', e);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onKeyUp = (e) => {
    if (e.target.value.length === 0) {
      handleChange(e);
    }
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
    <div className="content update-profile-page">
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
            onKeyUp={onKeyUp}
          />
          {validationErrors.UsernameErr ? (
            <span className="update-error">{validationErrors.UsernameErr}</span>
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
            onKeyUp={onKeyUp}
          />
          {validationErrors.PasswordErr ? (
            <span className="update-error">{validationErrors.PasswordErr}</span>
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
            onKeyUp={onKeyUp}
          />
          {validationErrors.EmailErr ? (
            <span className="update-error">{validationErrors.EmailErr}</span>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            defaultValue={
              userInfo.Birthday
                ? format(new Date(userInfo.Birthday), 'yyy-MM-dd')
                : ''
            }
            name="Birthday"
            type="date"
            onChange={handleChange}
          />
          {validationErrors.BirthdayErr ? (
            <span className="update-error">{validationErrors.BirthdayErr}</span>
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
    </div>
  );
}

UpdateProfile.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  clearUserOnDelete: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(UpdateProfile);
