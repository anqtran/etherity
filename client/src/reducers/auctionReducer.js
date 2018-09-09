import {
  ADD_AUCTION,
  GET_AUCTION,
  GET_AUCTIONS,
  UPDATE_AUCTION,
  AUCTION_LOADING,
  CLEAR_CURRENT_AUCTION,
  DELETE_AUCTION
} from '../actions/types';

const initialState = {
  auction: null,
  auctions: null,
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

    case UPDATE_AUCTION:
      var temp = state.data.map(function(item) {
        return item.id === action.payload.id ? action.payload : item;
      });
      return {
        ...state,
        data: temp
      };
    default:
      return state;
  }
}
