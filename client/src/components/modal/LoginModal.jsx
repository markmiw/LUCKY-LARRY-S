import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';
import styled from 'styled-components';
import { CloseButton, CloseText } from '../shared/button.styled.js'



function LoginModal({ setModal, setUser, setLoggedIn }) {
  const [info, setInfo] = useState({});

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
    const results = await axios.get(`/api/user/${info.username}`);

    if (results.data.length !== 1) return; // did not find a username
    if (info.password !== results.data[0].password) return; // password did not match

    const country = await axios.get(`/api/country/${results.data[0].countryid}`);

    if (country.data.length !== 1) return; // did not find a country

    results.data[0].country = country.data[0].country;
    setUser(results.data[0]);
    setLoggedIn(true);
    setModal(false);
  }

  function handleEnterSubmit(e) {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <Modal setModal={setModal}>
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold" style={{ color: 'white', marginLeft: '30px' }}>
            Sign in
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
            <label htmlFor="defaultForm-username">
              <input
                type="text"
                className="form-control validate"
                placeholder="Username"
                onChange={(e) => handleChange(e, 'username')}
              />
            </label>
          </div>
          <div className="md-form mb-4">
            <label htmlFor="defaultForm-pass">
              <input
                type="password"
                className="form-control validate"
                placeholder="Password"
                onChange={(e) => handleChange(e, 'password')}
                onKeyDown={(e) => handleEnterSubmit(e)}
              />
            </label>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            type="submit"
            className="btn"
            onClick={() => handleSubmit()}
          >
            Login
          </button>
        </div>
      </div>
    </Modal>
  );
}

LoginModal.propTypes = {
  setModal: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default LoginModal;

