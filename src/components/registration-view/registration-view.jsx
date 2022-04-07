import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RegistrationView() {
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
    const fields = Object.keys(userInfo);
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
    const isReq = validate();
    console.log(isReq, validationErrors);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control name="Username" type="text" onChange={handleChange} />
        {validationErrors.UsernameErr ? (
          <span>{validationErrors.UsernameErr}</span>
        ) : (
          ''
        )}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control name="Password" type="password" onChange={handleChange} />
        {validationErrors.PasswordErr ? (
          <span>{validationErrors.PasswordErr}</span>
        ) : (
          ''
        )}
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control name="Email" type="email" onChange={handleChange} />
        {validationErrors.EmailErr ? (
          <span>{validationErrors.EmailErr}</span>
        ) : (
          ''
        )}
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control name="Birthday" type="date" onChange={handleChange} />
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
  );
}
