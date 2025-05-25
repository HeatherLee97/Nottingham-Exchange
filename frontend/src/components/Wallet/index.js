import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addwalletAccount, deletewalletAccount } from '../../store/portfolio/walletAccount';
import Editwallet from './editWallet';
import AddmoneyPower from './AddmoneyPower';
import './wallet.css';

const walletForm = () => {
  const [errors, setErrors] = useState([]);

  const [wallet, setwallet] = useState(1);

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [info, setInfo] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let userId;
  if (user) {
    userId = user.id;
  }

  let wallets = Object.values(useSelector(state => state.wallets));
  let myAccounts = Object.values(useSelector(state => state.portfolio.wallet_accounts));

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors([]);

    const data = await dispatch(addwalletAccount(userId, wallet, accountNumber, name));
    if (data) {
      setErrors(data);
    }

    setInfo(true);
  };

  const handleClick = async e => {
    e.preventDefault();

    let id = e.target.id;

    const data = await dispatch(deletewalletAccount(id));

    if (data) {
      alert(data);
    }

    setInfo(true);
  };

  const updatewallet = e => {
    setwallet(e.target.value);
  };

  const updateName = e => {
    setName(e.target.value);
  };

  const updateAccountNumber = e => {
    setAccountNumber(e.target.value);
  };

  return (
    <>
      <div className='table-outer-container add-money-power-container'>
        <div className='table-inner-container'>
          {myAccounts?.length > 0 && <h3> My Linked Accounts: </h3>}

          {myAccounts?.length < 1 && <h3> Please add a wallet account: </h3>}

          <table className='linked-accounts-table'>
            {myAccounts?.length > 0 && (
              <tbody>
                <tr>
                <td>Name </td>
                <td>wallet </td>
                <td>Account Number </td>
                </tr>
                {/* <th>Edit </th>
              <th>Delete </th> */}
                {/* <th>wallet ID </th> */}
              </tbody>
            )}
            <tbody>
              {myAccounts?.map(wallet => (

                <tr key={wallet.id}>
                  <td>{wallet.name}</td>
                  <td>{wallet.wallet_name}</td>
                  <td>{wallet.account_number}</td>
                <td>
                  <AddmoneyPower
                    className='wallet-button'
                    userId={userId}
                    name={wallet.name}
                    accountNumber={wallet.account_number}
                    id={wallet.id}
                    walletId={wallet.wallet_id}
                  />

                  <Editwallet
                    className='wallet-button'
                    userId={userId}
                    name={wallet.name}
                    accountNumber={wallet.account_number}
                    id={wallet.id}
                    walletId={wallet.wallet_id}
                  />

                  <button className='wallet-button' id={wallet.id} onClick={handleClick}>
                    Delete
                  </button>
                  </td>
                  {/* <td>{wallet.id}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <br></br>
      <div className='form-outer-container'>
        <div className='form-inner-container'>
          <form className='wallet-form' onSubmit={handleSubmit}>
            <div className='wallet-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
              ))}
            </div>

            <div>
              <input type='hidden' id='userId' name='userId' value={userId} />
            </div>

            <div className='sub-container'>
              <div>
                <label htmlFor='wallet_id'>Select a wallet </label>
                <select
                  className='select-wallet'
                  name='wallet_id'
                  type='text'
                  value={wallet}
                  onChange={updatewallet}
                  required={true}
                >
                  {wallets?.map(wallet => (
                    <option key={wallet.id} value={wallet.id}> {wallet.name} </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor='accountNumber'>Account Number </label>
                <input
                  name='accountNumber'
                  type='text'
                  placeholder='Account Number'
                  required={true}
                  value={accountNumber}
                  onChange={updateAccountNumber}
                />
              </div>

              <div>
                <label htmlFor='name'>Name </label>
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={updateName}
                />
              </div>

              <button className='add-wallet-button' type='submit'>
                Add wallet
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default walletForm;