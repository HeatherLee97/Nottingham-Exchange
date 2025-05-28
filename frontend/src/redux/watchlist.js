const ADD_TO_WATCHLIST = 'watchlist/ADD';
const REMOVE_FROM_WATCHLIST = 'watchlist/REMOVE';

export const addToWatchlist = (symbol) => ({
  type: ADD_TO_WATCHLIST,
  symbol,
});

export const removeFromWatchlist = (symbol) => ({
  type: REMOVE_FROM_WATCHLIST,
  symbol,
});

const initialState = [];

export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      if (state.includes(action.symbol)) return state;
      return [...state, action.symbol];

    case REMOVE_FROM_WATCHLIST:
      return state.filter(sym => sym !== action.symbol);

    default:
      return state;
  }
}
