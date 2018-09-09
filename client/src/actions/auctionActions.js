import axios from 'axios';

import {
  ADD_AUCTION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_AUCTIONS,
  GET_AUCTION,
  AUCTION_LOADING,
  DELETE_AUCTION,
  UPDATE_AUCTION
} from './types';

// Add Auction
export const addAuction = (auctionData, history) => dispatch => {
  dispatch(clearErrors());

  axios
    .post('/api/auctions/add', auctionData)
    // .then(res =>
    //   dispatch({
    //     type: ADD_AUCTION,
    //     payload: res.data
    //   })
    // )
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Auctions
export const getAuctions = () => dispatch => {
  dispatch(setAuctionLoading());
  axios
    .get('/api/auctions')
    .then(res =>
      dispatch({
        type: GET_AUCTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AUCTIONS,
        payload: null
      })
    );
};

// Get Auction
export const getAuction = id => dispatch => {
  dispatch(setAuctionLoading());
  axios
    .get(`/api/auctions/${id}`)
    .then(res =>
      dispatch({
        type: GET_AUCTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AUCTION,
        payload: null
      })
    );
};

// Delete Auction
export const deleteAuction = id => dispatch => {
  axios
    .delete(`/api/auctions/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_AUCTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Bid
export const updateAuction = (auctionData, history) => dispatch => {
  dispatch(clearErrors());
  console.log('updateAuction');
  axios
    .put(`/api/auctions/bid/${auctionData.id}`, auctionData)
    .then(res => history.push('/auctions'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setAuctionLoading = () => {
  return {
    type: AUCTION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
