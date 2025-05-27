

import { useDispatch } from "react-redux";

import { fetchDeleteWatchlist } from "../../store/lists";
import "../../css/Watchlist.css";

function DeleteWatchlistModal({ setShowDeleteModal, listId }) {
  const dispatch = useDispatch();


  const handleSubmit = (e) => {


    e.preventDefault();
    dispatch(fetchDeleteWatchlist(listId))
    .then(() => setShowDeleteModal(false))
  };


  return (
    <div className="delete-form-container">
      <div className="delete-form-header">
      <div className="delete-title">Are you sure you want to delete &quot;watchlist and your stocks&quot;?</div>
      </div>
      <div className="delete-form">
          <button className="delete-list-submit" onClick={handleSubmit}>
            Delete
          </button>

      </div>
    </div>
  );
}

export default DeleteWatchlistModal;