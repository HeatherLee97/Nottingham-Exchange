import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal2 } from './context/Modal';
import { editwalletAccount } from '../../store/portfolio/walletAccount';
import './wallet.css';

function Editwallet({ userId, name, accountNumber, id, walletId }) {
  const [showModal, setShowModal] = useState(false);

  const [updatedwallet] = useState(walletId);
  const [updatedName, setUpdatedname] = useState(name);
  const [updatedAccountNumber, setUpdatedAccountNumber] = useState(accountNumber);

  const [errors, setErrors] = useState([]);

  
  const dispatch = useDispatch();

  const updateName = e => {
    setUpdatedname(e.target.value);
  };

  const updateAccountNumber = e => {
    setUpdatedAccountNumber(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    let data = [];

    let newwallet = {
      userId,
      walletId: updatedwallet,
      name: updatedName,
      accountNumber: updatedAccountNumber,
      id,
    };

    data = await dispatch(editwalletAccount(newwallet));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setShowModal(false);
    }
  };

  return (
    <>
      <button className='wallet-button' onClick={() => setShowModal(true)}>Edit wallet</button>

      {showModal && (
        <Modal2
          title={`Edit wallet information for ${name}:`}
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          {/* <h1>name: {name}</h1>
          <h1>account: {accountNumber}</h1>
          <h1>id: {id}</h1>
          <h1>walletId: {walletId}</h1>
          <h1>userId: {userId}</h1> */}

          <form onSubmit={handleSubmit}>
            <div className='wallet-errors'>
              {errors?.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
              ))}
            </div>

            <div>
              <input type='hidden' id='userId' name='userId' value={userId} />
            </div>

            <div>
              <label htmlFor='accountNumber'>Account Number </label>
              <input
                name='accountNumber'
                type='text'
                placeholder='Account Number'
                required={true}
                value={updatedAccountNumber}
                onChange={updateAccountNumber}
              />
            </div>

            <div>
              <label htmlFor='name'>Name </label>
              <input
                name='name'
                type='text'
                placeholder='Name'
                value={updatedName}
                onChange={updateName}
              />
            </div>

            <button className='submit-button' type='submit'>Submit Changes</button>
          </form>
        </Modal2>
      )}
    </>
  );
}

export default Editwallet;