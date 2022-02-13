import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className='container'>
        <h1 className='large text-primary'>Créez votre profil</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Ajoutez quelques informations à votre
          profil afin qu'il se démarque !
        </p>
        <small>* = ce champ est requis</small>
        <form className='form'>
          <div className='form-group'>
            <select name='status' value={status} onChange={onChange}>
              <option value='0'>
                * Selectionnez votrez statut professionel
              </option>
              <option value='Developer'>Développeur</option>
              <option value='Junior Developer'>Développeur Junior</option>
              <option value='Senior Developer'>Développeur Senior</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>
                Etudiant ou Autodidacte
              </option>
              <option value='Instructor'>Formateur ou Professeur</option>
              <option value='Intern'>Stagiaire</option>
              <option value='Other'>Autre</option>
            </select>
            <small className='form-text'>
              Où en êtes vous dans votre carrière ?
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Entreprise'
              name='company'
              value={company}
              onChange={onChange}
            />
            <small className='form-text'>
              Peut-être votre propre entreprise ou celle pour laquelle vous
              travaillez
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Site web'
              name='website'
              value={website}
              onChange={onChange}
            />
            <small className='form-text'>
              Peut être le vôtre ou celui d'une entreprise
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Localisation'
              name='location'
              value={location}
              onChange={onChange}
            />
            <small className='form-text'>
              Ville & Département (eg. Toulouse, Occitanie)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Compétences'
              name='skills'
              value={skills}
              onChange={onChange}
            />
            <small className='form-text'>
              Merci de séparer les valeurs par des virgules (eg.
              HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Compte Github'
              name='githubusername'
              value={githubusername}
              onChange={onChange}
            />
            <small className='form-text'>
              Si vous souhaitez que vos derniers repos et votre profil GitHub
              affiché, renseignez votre identifiant GitHub
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='Une courte présentation'
              name='bio'
              value={bio}
              onChange={onChange}
            ></textarea>
            <small className='form-text'>
              Dites nous en plus à votre sujet
            </small>
          </div>

          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-secondary'
            >
              Ajoutez vos réseaux sociaux
            </button>
            <span>Optionnel</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Compte Twitter'
                  name='twitter'
                  value={twitter}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Compte Facebook'
                  name='facebook'
                  value={facebook}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='Compte YouTube'
                  name='youtube'
                  value={youtube}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Compte Linkedin'
                  name='linkedin'
                  value={linkedin}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Compte Instagram'
                  name='instagram'
                  value={instagram}
                  onChange={onChange}
                />
              </div>
            </Fragment>
          )}

          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='dashboard.html'>
            Retour
          </a>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
