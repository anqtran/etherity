import axios from 'axios';

import { GET_ORGANIZATIONS, ORGANIZATION_LOADING } from './types';

// Get all organizations
export const getOrganizations = () => dispatch => {
  dispatch(setOrganizationLoading());
  console.log('get organizaiont action');
  axios
    .get('/api/organizations/all')
    .then(res =>
      dispatch({
        type: GET_ORGANIZATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORGANIZATIONS,
        payload: null
      })
    );
};

// Organization loading
export const setOrganizationLoading = () => {
  return {
    type: ORGANIZATION_LOADING
  };
};
