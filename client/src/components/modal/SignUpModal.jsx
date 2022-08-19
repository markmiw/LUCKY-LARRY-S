import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';
import flags from '../sidebar/flags';
import styled from 'styled-components';
import { CloseButton, CloseText } from '../shared/button.styled.js'

function SignUpModal({ setModal }) {
  // PROBABLY MORE FIELDS
  const [info, setInfo] = useState({
    username: '',
    password: '',
    reEnterPassword: '',
    country: 'Ussr',
  });
  const [userExists, setUserExists] = useState(false);

  function handleChange(e, field) {
    setInfo((prev) => {
      const obj = {
        ...prev,
      };
      obj[field] = e.target.value;
      return obj;
    });
  }

  async function handleSubmit() {
    if (info.password !== info.reEnterPassword || info.username === '' || info.password === '') return;

    const res = await axios.post('/api/user', info);
    // need to check what happens when username already exists
    if (res.data === 'User exists already') setUserExists(true); // if user exists - turn into modal
    else { setModal(false); }
  }

  return (
    userExists ? (
      <Modal>
        <div style={{ color: 'white' }}>User already exists.</div>
        <CloseButton
          type="button"
          className="close"
          onClick={() => setModal(false)}
        >
          <span aria-hidden="true">&times;</span>
        </CloseButton>
      </Modal>
    )
      : (
        <Modal setModal={setModal}>
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold" style={{ color: 'white', marginLeft: '30px' }}>
                Create Account
              </h4>
              <CloseButton
                type="button"
                className="close"
                onClick={() => setModal(false)}
              >
                <CloseText aria-hidden="true">&times;</CloseText>
              </CloseButton>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-4">
                <input
                  type="text"
                  className="form-control validate"
                  placeholder="Username"
                  onChange={(e) => handleChange(e, 'username')}
                />
              </div>
              <div className="md-form mb-4">
                <input
                  type="password"
                  className="form-control validate"
                  placeholder="Password"
                  onChange={(e) => handleChange(e, 'password')}
                />
              </div>
              <div className="md-form mb-4">
                <input
                  type="password"
                  className="form-control validate"
                  placeholder="Re-enter Password"
                  onChange={(e) => handleChange(e, 'reEnterPassword')}
                />
              </div>
              <div className="md-form mb-4">
                <select
                  className="form-select"
                  aria-label=".form-select-lg"
                  onChange={(e) => handleChange(e, 'country')}
                  defaultValue={info.country}
                >
                  {Object.keys(flags).map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="submit"
                className="btn"
                onClick={() => handleSubmit()}
                style={{ color: 'white' }}
              >
                Create account
              </button>
            </div>
          </div>
        </Modal>
      )
  );
}

SignUpModal.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default SignUpModal;
