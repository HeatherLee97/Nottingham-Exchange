import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlist } from '../../store/portfolio/watchlist';
import { Modal2 } from '../Watchlists/context/Modal';
import './Watchlist.css';

const CreateWatchlist = ({ showModal,setShowModal }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const updateTitle = e => setTitle(e.target.value);
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = [];
    if (title) {
      const button = document.getElementById('submitCreateWatchlist');
      const titleInput = document.getElementById('titleInput');

      button.disabled = true;
      titleInput.disabled = true;
      let createdWatchlist = await dispatch(createWatchlist(title, sessionUser.id));
      if (createdWatchlist.error) {
        errors.push(createdWatchlist.error);
        button.disabled = false;
        titleInput.disabled = false;
        setValidationErrors(errors);
      } else {
        
        setShowModal(false)
      }
    }
  };
  let count = 0;
  return (
    <div className='create_watchlist_container'>
    <Modal2
    className={"modalWatchlist"}
    title={`Create Watchlist`}
          onClose={() => setShowModal(false)}
          show={showModal}>
      <div>
        <form className='create_Watchlist' onSubmit={handleSubmit}>
          <div>
          {validationErrors.length > 0 && (
            <div className='errorsContainer'>
              {validationErrors.map(currError => {
                return <p key={`error-${count++}`}>{currError}</p>;
              })}
            </div>
          )}
            </div>

            <input
              type='textarea'
              id='titleInput'
              placeholder='Title'
              value={title}
              onChange={updateTitle}
            />
          <input id='submit_Watchlist' type={'submit'}></input>
        </form>
      </div>
    </Modal2>
    </div>
  );
};

export default CreateWatchlist;