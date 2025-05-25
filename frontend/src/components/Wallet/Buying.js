import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal2 } from './context/Modal';
import { addMoney } from '../../store/portfolio/moneyPower';

function AddMoney({ userId, name, accountNumber, id, walletId }) {
  const [showModal, setShowModal] = useState(false);

  const [money, setMoney] = useState(0);

  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const updateB = e => {
    setMoney(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    const data = await dispatch(addMoney(money));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setShowModal(false);
    }
    setMoney(0);
  };

  return (
    <>
      <button className='wallet-button' onClick={() => setShowModal(true)}>Add B</button>

      {showModal && (

        <Modal2
          title={`Transfer funds from ${name}`}
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
              <label htmlFor='money'>money </label>
              <input
                name='money'
                type='number'
                required={true}
                value={money}
                onChange={updateB}
              />
            </div>

            <button className='submit-button' type='submit'>Add M</button>
          </form>
        </Modal2>

      )}
    </>
  );
}

export default Addmoney;