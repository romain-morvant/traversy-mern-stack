import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Bienvenue {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>a un profil</Fragment>
        ) : (
          <Fragment>
            <p>
              Vous n'avez pas encore crée de profil, merci d'ajouter vos
              informations.{' '}
            </p>
            <Link to={'/create-profile'} className='btn btn-primary my-1'>
              Créer mon profil
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
