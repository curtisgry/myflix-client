import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginView({ onLoggedIn }) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleChange = (e) => {
                console.log(e.target.name);
                if (e.target.name === 'username') {
                        return setUsername(e.target.value);
                }
                setPassword(e.target.value);
        };

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(username);
                // send login auth request will go here
                onLoggedIn(username);
        };

        return (
                <div>
                        <a href="#">Sign Up Here</a>
                        <Form>
                                <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control name="username" type="text" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control name="password" type="password" onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                </Button>
                        </Form>
                </div>
        );
}

LoginView.propTypes = {
        onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
