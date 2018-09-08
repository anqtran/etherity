import {
  GET_ORGANIZATIONS,
  ADD_ORGANIZATION,
  ORGANIZATION_LOADING
} from '../actions/types';

const initialState = {
  organizations: [],
  organization: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORGANIZATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
        loading: false
      };
    case ADD_ORGANIZATION:
      return {
        ...state,
        organizations: [action.payload, ...state.organizations]
      };

    default:
      return state;
  }
}
