import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import CreateWatchlistForm from '../CreateWatchlistform';
import Watchlist from './Watchlist';
// import { deleteStockFromWatchlist, deleteWatchlistReducer } from '../../store/portfolio/watchlist';
import 'react-tabs/style/react-tabs.css';
import './Watchlist.css';
// import EditWatchlistForm from '../EditWatchlistForm';

// import WatchlistMenu from './WatchlistMenu';

const WatchlistList = ({ quotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal] = useState(false);
  const [showCreateWatchlistForm] = useState(true);
  const [createWatchlistText] = useState('New Watchlist');
  // const [activeEditWatchlist, setActiveEditWatchlist] = useState(null);
  
  // const [isOpen, setOpen] = useState(false);

  // const watchlists = Object.values(useSelector(state => state.portfolio.watchlists));

  // const toggleCreateWatchlistForm = async e => {
  //   setShowModal(true);
  //   changeCreateWatchlistForm(!showCreateWatchlistForm);
  // };

  // const deleteWatchlist = async (e, watchlist) => {
  //   await dispatch(deleteWatchlistReducer(watchlist.id));
  // };

  if (showEditModal) {
  }
  if (isOpen) {
  }
  return (
    <div className='watchlist_List_Container'>
      <div>
        <button className={'createWatchlistButton'} onClick={showCreateWatchlistForm}>
          {createWatchlistText}
        </button>
        {showModal && (
          <CreateWatchlistForm
            hideform={showCreateWatchlistForm}
            showModal={showModal}
            setShowModal={setShowModal}
          ></CreateWatchlistForm>
        )}
      </div>

      {WatchlistList &&
        Watchlist.map(watchlist => {
          return (
            <div
              key={'watchlist' + watchlist.id}
              className={'notActiveWatchlist watchlist'}
              onClick={event => {
                if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SPAN') {
                  //target is specific event.target === event.currentTarget ||
                  // console.log('hitting true');
                  if (event.currentTarget.classList.contains('activeWatchlist'))
                    event.currentTarget.classList.remove('activeWatchlist');
                  else {
                    event.currentTarget.classList.add('activeWatchlist');
                  }
                } 
              }}
            >
              <div className='flexDiv'>
                {/* <Hamburger size={20} toggled={isOpen} toggle={setOpen}>
             </Hamburger> */}
                {/* all menus are opening rather than just the one clicked */}
                {/* <div className='innerFlexDiv'>
             <span onClick={(e) => toggleIsOpen(e)}> + </span>
             {isOpen &&<WatchlistMenu watchlist={watchlist}></WatchlistMenu>}
             </div> */}
                {/* <button className='editWatchlist' onClick={(e)=> toggleShowEditModal(e,watchlist)}>Edit</button>
            <button className='deleteWatchlist testing' onClick={(e) => deleteWatchlist(e,watchlist)}>Delete</button> */}
                {/* {editForm} */}
                {<Watchlist watchlist={watchlist} quotes={quotes}></Watchlist>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WatchlistList;