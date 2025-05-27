const SPEND = 'wallet/SPEND';
const REFUND = 'wallet/REFUND';

export const spend = (amount) => ({ type: SPEND, amount });
export const refund = (amount) => ({ type: REFUND, amount });

const initialState = 1000;

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case SPEND:
      return state - action.amount;
    case REFUND:
      return state + action.amount;
    default:
      return state;
  }
}