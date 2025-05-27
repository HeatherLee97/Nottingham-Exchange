const ADD_ORDER = 'orders/ADD';
const UPDATE_ORDER = 'orders/UPDATE';
const CANCEL_ORDER = 'orders/CANCEL';

let nextOrderId = 1;

export const addOrder = (order) => ({
  type: ADD_ORDER,
  order: { id: nextOrderId++, ...order },
});
export const updateOrder = (id, newShares) => ({
  type: UPDATE_ORDER,
  id,
  newShares,
});
export const cancelOrder = (id) => ({
  type: CANCEL_ORDER,
  id,
});

const initialState = [];

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER:
      return state.map((order) =>
        order.id === action.id ? { ...order, shares: action.newShares } : order
      );
    case CANCEL_ORDER:
      return state.filter((order) => order.id !== action.id);
    default:
      return state;
  }
}