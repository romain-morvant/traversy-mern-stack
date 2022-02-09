import React from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>DevConnector</h1>
          <p className='lead'>
            Créez un profil / portfolio, partagez des posts et faîtes vous aider
            par les autres membres !
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Inscription
            </Link>
            <Link to='/login' className='btn btn-light'>
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
