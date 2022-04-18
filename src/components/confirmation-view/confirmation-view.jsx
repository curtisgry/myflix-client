import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './confirmation-view.scss';

export default function ConfirmationView() {
  return (
    <div className="confirmation-page">
      <h2>Account has been deleted.</h2>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
