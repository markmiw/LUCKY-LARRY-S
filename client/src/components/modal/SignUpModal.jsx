import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';
import flags from '../sidebar/flags';

function SignUpModal({ setModal }) {
  // PROBABLY MORE FIELDS
  const [info, setInfo] = useState({
    username: '',
    password: '',
    reEnterPassword: '',
    country: 'Ussr',
  });

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

    let res = await axios.post('/api/user', info);
    // need to check what happens when username already exists

    setModal(false);
  }

  return (
    <Modal setModal={setModal}>
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">
            Create Account
          </h4>
          <button
            type="button"
            className="close"
            onClick={() => setModal(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
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
          >
            Create account
          </button>
        </div>
      </div>
    </Modal>
  );
}

SignUpModal.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default SignUpModal;
