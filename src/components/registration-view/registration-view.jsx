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

        const handleChange = (e) => {
                console.log(userInfo);
                const { name, value } = e.target;
                setUserInfo({ ...userInfo, [name]: value });
        };

        return (
                <Form>
                        <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control name="username" type="text" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="password" type="password" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name="email" type="email" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                                <Form.Label>Date of Birth:</Form.Label>
                                <Form.Control name="birthday" type="date" onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                                Submit
                        </Button>
                </Form>
        );
}
