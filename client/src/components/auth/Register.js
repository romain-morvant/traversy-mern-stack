import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

export const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Les mots de passe ne sont pas identiques ..', 'danger');
    } else {
      console.log('BRAVO !');
    }
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Inscription</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Créez Votre Compte
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Adresse email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            Ce site utilise les Gravatar, donc si vous voulez l'activer,
            utilisez un email gravatar !
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de passe'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirmez le mot de passe'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Inscription' />
      </form>
      <p className='my-1'>
        Vous avez déjà un compte ? <Link to='/login'>Connectez vous</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
