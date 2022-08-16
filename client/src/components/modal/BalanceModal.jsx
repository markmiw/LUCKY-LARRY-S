import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';

function BalanceModal({ user, setUser, setModal }) {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(Number(e.target.value));
  }

  async function handleSubmit() {
    const results = await axios.post('/api/user/balance', { id: user.id, amount });
    // don't think it is possible to error, DOUBLE CHECK THIS

    setUser(results.data.rows[0]);
    setModal(false);
  }

  return (
    <Modal setModal={setModal}>
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">
            Top Off
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
            <label htmlFor="defaultForm-username">
              Amount
              <input
                type="number"
                min="0"
                className="form-control validate"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button type="submit" className="btn" onClick={() => handleSubmit()}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

BalanceModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    countryid: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    winnings: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default BalanceModal;
