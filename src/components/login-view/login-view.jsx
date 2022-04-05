import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import RegistrationView from '../registration-view/registration-view';

function LoginView({ onLoggedIn }) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const [usernameErr, setUsernameErr] = useState('');
        const [passwordErr, setPasswordErr] = useState('');

        const validate = () => {
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
                console.log(e.target.name);
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
                        axios.post('https://myflix-api-cgray.herokuapp.com/login', {
                                Username: username,
                                Password: password,
                        })
                                .then((response) => {
                                        const { data } = response;
                                        onLoggedIn(data);
                                })
                                .catch((e) => {
                                        console.log('No user found');
                                });
                }
        };

        return (
                <div>
                        <a href="#">Sign Up Here</a>
                        <Form>
                                <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control name="username" type="text" onChange={handleChange} />
                                        {usernameErr ? <span>{usernameErr}</span> : ''}
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control name="password" type="password" onChange={handleChange} />
                                        {passwordErr ? <span>{passwordErr}</span> : ''}
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                </Button>
                        </Form>
                        <RegistrationView />
                </div>
        );
}

LoginView.propTypes = {
        onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
