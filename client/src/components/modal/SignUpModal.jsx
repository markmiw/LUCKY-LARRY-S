import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';

function SignUpModal({ setModal }) {
  // PROBABLY MORE FIELDS
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

  function handleSubmit() {
    if (info.password !== info.reEnterPassword) return;
    const results = axios.post('/api/user', info); // CHECK WHAT ROUTE WE ARE USING, ALSO PROBABLY MORE FIELDS
    if (info.password === results.password) {
      // valid
    }
    setModal(false);
  }

  return (
    <Modal setModal={setModal}>
      <div className="modal-content">
        <div className="modal-header text-center bg-info">
          <h4 className="modal-title w-100 font-weight-bold">
            Create Account
          </h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
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
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-info"
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
