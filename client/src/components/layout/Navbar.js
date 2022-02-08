import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='!#'>Développeurs</Link>
        </li>
        <li>
          <Link to='/register'>Inscription</Link>
        </li>
        <li>
          <Link to='/login'>Connexion</Link>
        </li>
      </ul>
    </nav>
  );
}
