import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import axios from 'axios';

function BalanceModal({ setModal }) {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleSubmit() {
    // axios post increase balance
    setModal(false);
  }

  return (
    <Modal setModal={setModal}>
      <div className="modal-content">
        <div className="modal-header text-center bg-info">
          <h4 className="modal-title w-100 font-weight-bold">
            Top Off
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
            <label htmlFor="defaultForm-username">
              Amount
              <input
                type="number"
                min="0"
                id="defaultForm-username"
                className="form-control validate"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button type="submit" className="btn btn-info" onClick={() => handleSubmit()}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

BalanceModal.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default BalanceModal;
