import {
  ADD_AUCTION,
  GET_AUCTION,
  GET_AUCTIONS,
  AUCTION_LOADING,
  CLEAR_CURRENT_AUCTION,
  DELETE_AUCTION
} from '../actions/types';

const initialState = {
  auction: {},
  auctions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUCTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_AUCTION:
      return {
        ...state,
        auction: action.payload,
        loading: false
      };
    case GET_AUCTIONS:
      return {
        ...state,
        auctions: action.payload,
        loading: false
      };
    case ADD_AUCTION:
      return {
        ...state,
        auctions: [action.payload, ...state.auctions]
      };
    case CLEAR_CURRENT_AUCTION:
      return {
        ...state,
        auction: null
      };
    case DELETE_AUCTION:
      return {
        ...state,
        auctions: state.auctions.filter(
          auction => auction._id !== action.payload
        )
      };
    default:
      return state;
  }
}
