import {
  FETCH_BACKGROUND_IMAGE_PENDING
} from '../action_types/BackgroundImageActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  backgroundImageUrl: null,
  fetched: false,
  fetching: false
};

export default createReducer(initialState, {

  name: 'BackgroundImage',

  handlers: {
    onFetching: [FETCH_BACKGROUND_IMAGE_PENDING]
  },

  onFetching(state) {
    return {...state, fetched: false, fetching: true};
  }

});