import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Polls closed</Link>
  </div>
);

export default NotFoundPage;

// Done
