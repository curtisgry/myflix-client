import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginView({ onLoggedIn }) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleChange = (e) => {
                if (e.target.name === 'Username') {
                        return setUsername(e.target.value);
                }
                setPassword(e.target.value);
        };

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(username, password);
                // send login auth request will go here
                onLoggedIn(username);
        };

        return (
                <div>
                        <a href="#">Sign Up Here</a>
                        <form action="POST" onSubmit={handleSubmit}>
                                <label htmlFor="Username">
                                        Username:
                                        <input type="text" name="Username" value={username} onChange={handleChange} />
                                </label>
                                <label htmlFor="Password">
                                        Password:
                                        <input
                                                type="password"
                                                name="Password"
                                                value={password}
                                                onChange={handleChange}
                                        />
                                </label>
                                <button type="submit">Log In</button>
                        </form>
                </div>
        );
}

LoginView.propTypes = {
        onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
