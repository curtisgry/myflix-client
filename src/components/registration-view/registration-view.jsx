import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegistrationView() {
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
                <div>
                        <form action="POST">
                                <label htmlFor="username">
                                        Username:
                                        <input
                                                id="username"
                                                type="text"
                                                name="Username"
                                                value={userInfo.Username}
                                                onChange={handleChange}
                                        />
                                </label>
                                <label htmlFor="password">
                                        Password:
                                        <input
                                                id="password"
                                                type="password"
                                                name="Password"
                                                value={userInfo.Password}
                                                onChange={handleChange}
                                        />
                                </label>
                                <label htmlFor="email">
                                        Email:
                                        <input
                                                id="email"
                                                type="email"
                                                name="Email"
                                                value={userInfo.Email}
                                                onChange={handleChange}
                                        />
                                </label>
                                <label htmlFor="birthday">
                                        Date of Birth:
                                        <input
                                                id="birthday"
                                                type="date"
                                                name="Birthday"
                                                value={userInfo.Birthday}
                                                onChange={handleChange}
                                        />
                                </label>
                        </form>
                </div>
        );
}

export default RegistrationView;
